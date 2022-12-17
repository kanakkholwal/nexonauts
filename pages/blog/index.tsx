import React, { useEffect, useState } from 'react';
import { getAllPosts_URL } from "@/src/content/api/getAPIs"
import { Markup } from 'interweave';

const useFetch = (url: string, options = {}) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, SetLoading] = useState(false);


    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            SetLoading(true);
            try {
                const res = await fetch(url, { ...options, signal: abortController.signal });
                const json = await res.json();
                setResponse(json);
            } catch (error) {
                setError(error);
            }
            finally {
                SetLoading(false);
            }
        };
        fetchData();
        return () => {
            abortController.abort();
        }
    }, [url]);

    return { response, error, loading }
}
export default function BlogHomePage() {

    const { response, error, loading } = useFetch(getAllPosts_URL(50), {})

    if (error)
        console.log(error)

    if (loading)
        console.log("loading")

    if (response)
        console.log(response.items)

    return (
        <>
            home page

            {response && <Markup content={response.items[2].content} />}


        </>
    )
}