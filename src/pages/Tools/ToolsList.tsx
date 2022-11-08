import React from 'react';

import Image2Webp from "./pages/Image2Webp";
import Text2Handwriting from "./pages/Text2Handwriting";
import MetaTagGenerator from "./pages/MetaTagGenerator";
import IframeGenerator from "./pages/IframeGenerator";

interface ToolProp {
    title: string,
    description: string,
    category: string,
    path: string,
    Component: JSX.Element,
    online: boolean
}

const ToolList: ToolProp[] = [

    {
        title: "Image to Webp Convertor",
        description: "This Tool helps you to convert Any Image Format to Webp Format to boost your WebPage Speed..",
        category: "Image Tools",
        path: "/tools/image-to-webp-convertor",
        Component: <Image2Webp />,
        online: false
    },
    {
        title: "Text To Handwriting Tool",
        description: "This Tool converts text to an image that looks like handwriting...",
        category: "Web  Tools",
        path: "/tools/text-to-handwriting",
        Component: <Text2Handwriting />,
        online: false
    }
    ,
    {
        title: "Meta Tag Generator",
        description: "Meta tags are used by search engines to help index and to provide relevant content in their Google search results worldwide",
        category: "Web  Tools",
        path: "/tools/meta-tag-generator",
        Component: <MetaTagGenerator />,
        online: true
    }
    ,
    {
        title: "iFrame Embed Code Generator",
        description: "With the help of this tool, you can generate your iframe codes easily with just a click of a button.",
        category: "Web  Tools",
        path: "/tools/iframe-generator",
        Component: <IframeGenerator />,
        online: false
    }
]

// Object.freeze(ToolList)
export default ToolList;