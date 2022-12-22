import { useEffect } from 'react'
import useSWR from 'swr';

async function fetcher(...args) {
    const res = await fetch(...args)
    return res.json()
}

export default function ShareCounter({ slug }) {
    const pageName = slug.split('/').join('_');
    const { data } = useSWR(`/api/pages/shares/${pageName}`, fetcher)
    const shares = new Number(data?.total)

    useEffect(() => {
        const registerShare = () =>
            fetch(`/api/pages/shares/${pageName}`, {
                method: 'POST',
            })

        registerShare()
    }, [pageName])

    return `${shares > 0 ? shares.toLocaleString() : '–'} shares`
}