import Image from "next/image";

const ImgLoader = ({ src, width, quality }) => {
    return `${process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://kkupgrader.eu.org"}/${src}?w=${width}&q=${quality || 75}`
}

export default function LocalImage({ src, width, props }) {


    return (<Image loader={ImgLoader} src={src} width={width} {...props} />)
}