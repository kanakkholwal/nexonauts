import { useEffect, useState } from "react";

export default function useShare({
    title,
    url,
    description,
    image,
}:{
    title:string,
    url:string,
    description:string,
    image:string,
}){
    const copyLink =  async () => {
        await navigator.clipboard.writeText(url);
    }
    const [isShareNavigatorAvailable, setIsShareNavigatorAvailable] = useState(false);
    useEffect(() => {
        if (navigator && navigator.share !== undefined && navigator.share !== null) {
            setIsShareNavigatorAvailable(true);
        }
    }, []);
    

    return {
        nativeShare:isShareNavigatorAvailable ? navigator.share({
            title,
            url,
            text:description,
            files:[image as any],
        }):false,
        copyLink,
        socials:[
            {
                name:'facebook',
                url:`https://www.facebook.com/sharer/sharer.php?u=${url}`
            },
            {
                name:'twitter',
                url:`https://twitter.com/intent/tweet?url=${url}&text=${title}`
            },
            {
                name:'linkedin',
                url:`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`
            },
            {
                name:'whatsapp',
                url:`https://api.whatsapp.com/send?text=${url}`
            },
            {
                name:'pinterest',
                url:`https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${description}`
            },
            {
                name:'telegram',
                url:`https://t.me/share/url?url=${url}&text=${title}`
            },
            {
                name:'reddit',
                url:`https://www.reddit.com/submit?url=${url}&title=${title}`
            },
            {
                name:'email',
                url:`mailto:?subject=${title}&body=${url}`
            },

        ]
    } as {
        nativeShare:boolean | (() =>Promise<void>),
        copyLink:()=>Promise<void>,
        socials:{
            name:string,
            url:string,
        }[]
    }



}