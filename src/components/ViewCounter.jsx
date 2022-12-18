import { useEffect } from 'react'
import useSWR from 'swr';

async function fetcher(...args) {
    const res = await fetch(...args)
    return res.json()
}

export default function ViewCounter({ slug }) {
    const pageName = slug.split('/').join('_');
    const { data } = useSWR(`/api/pages/views/${pageName}`, fetcher)
    const views = new Number(data?.total)

    useEffect(() => {
        const registerView = () =>
            fetch(`/api/pages/views/${pageName}`, {
                method: 'POST',
            })

        registerView()
    }, [pageName])

    return `${views > 0 ? views.toLocaleString() : '–'} views`
}