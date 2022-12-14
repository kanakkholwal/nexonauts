import React from 'react';

import Image2Webp from "./pages/Image2Webp";
import CssMinifierPrettifier from "./pages/CssMinifierPrettifier";
import MetaTagGenerator from "./pages/MetaTagGenerator";
import IframeGenerator from "./pages/IframeGenerator";
import HtmlParser from "./pages/HtmlParser";

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
        title: "Css Minifier and Prettifier Tool",
        description: "  Online CSS Minifier takes any form of css code and make it minified,compressed by removing white spaces, newlines, indentation and comments and here You can also Beautify Css to make it easy to read and edit. It reduces file size and optimizes css for your website.",
        category: "Coding  Tools",
        path: "/tools/css-minifier-and-prettifier",
        Component: <CssMinifierPrettifier />,
        online: true
    }
    ,
    {
        title: "Html Parser Tool",
        description: "  Online CSS Minifier takes any form of css code and make it minified,compressed by removing white spaces, newlines, indentation and comments and here You can also Beautify Css to make it easy to read and edit. It reduces file size and optimizes css for your website.",
        category: "Coding  Tools",
        path: "/tools/html-parser-tool",
        Component: <HtmlParser />,
        online: true
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