import { useRouter } from "next/router"
import { useEffect } from "react";

export default function PortFolio() {

    const router = useRouter();

    useEffect(() => {
        router.replace("kanakkholwal.eu.org");
    }, [])
    return (

        <>

            This is PortFolio page ..
            website is still in dev phase
        </>
    )
}