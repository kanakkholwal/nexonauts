"use client";

import { useEffect, useState } from "react";


export default function Authorisor({ code, scope, saveToken }: {
    code: string, scope: string,
    saveToken: (options: { code: string; scope: string; redirect_uri: string; }) => Promise<any>
}) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<any | null>(null);

    useEffect(() => {

        saveToken({ code, scope, redirect_uri: process.env.NEXT_PUBLIC_WEBSITE_URL + "/products/import-from-gumroad?scope=" + scope })
            .then((data) => {
                setData(data);
            }).catch((e) => {
                setError(e);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [])

    return (<>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {data && <div>Token saved</div>}


    </>)
}