import { useState, useEffect } from 'react';


export const useFetch = (url: string, options = {}) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, SetLoading] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();
        (async () => {
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
        })();
        return () => {
            abortController.abort();
        }
    }, [url, options]);

    return [response, error, loading]
}