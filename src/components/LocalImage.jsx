import Image from "next/image";
import { useEffect, useState } from "react";

const ImgLoader = ({ src, width, quality }) => {
    const [origin, setOrigin] = useState();

    useEffect(() => {
        const isLocalhost = Boolean(
            window.location.hostname === 'localhost' ||
            // [::1] is the IPv6 localhost address.
            window.location.hostname === '[::1]' ||
            // 127.0.0.1/8 is considered localhost for IPv4.
            window.location.hostname.match(
                /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
            )
        );
        isLocalhost ? setOrigin("http://localhost:3000") : setOrigin("https://kkupgrader.eu.org");
    }, []);

    return `${origin}/${src}?w=${width}&q=${quality || 75}`
}

export default function LocalImage({ src, width, props }) {


    return (<Image loader={ImgLoader} src={src} width={width} {...props} />)
}