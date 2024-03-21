"use client";

import { useEffect, useState } from "react";


export default function Authorisor({ code, saveToken }: {
    code: string,
    saveToken: (code: string) => Promise<any>
}) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<any | null>(null);

    useEffect(() => {

        saveToken(code)
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