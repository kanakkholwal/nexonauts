import React from 'react';
//Icons
// import { HiOutlineFolderDownload } from "react-icons/hi";
import { IoImageOutline } from "react-icons/io5";
import { BiCodeAlt } from "react-icons/bi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { TbTools } from "react-icons/tb";
//Tools
import Image2Webp from "./pages/Image2Webp";
import CssMinifierPrettifier from "./pages/CssMinifierPrettifier";
import HtmlMinifierPrettifier from "./pages/HtmlMinifierPrettifier";
import JsonMinifierPrettifier from "./pages/JsonMinifierPrettifier";
// import YouTubeDownloader from "./pages/YouTubeDownloader";
import MetaTagGenerator from "./pages/MetaTagGenerator";
import IframeGenerator from "./pages/IframeGenerator";
import HtmlParser from "./pages/HtmlParser";
import HtmlToJsxTool from "./pages/HtmlToJsx";

interface ToolProp {
    title: string,
    description: string,
    category: string,
    path: string,
    Component: JSX.Element,
    online: boolean
}

export const ToolList: ToolProp[] = [

    // {
    //     title: "Youtube Downloader",
    //     description: "This Tool helps you to download YouTube Videos in multiple formats",
    //     category: "Downloader",
    //     path: "/tools/youtube-downloader",
    //     Component: <YouTubeDownloader />,
    //     online: true
    // },
    {
        title: "Image to Webp Convertor",
        description: "This Tool helps you to convert Any Image Format to Webp Format to boost your WebPage Speed..",
        category: "Image Tools",
        path: "/tools/image-to-webp-convertor",
        Component: <Image2Webp />,
        online: true
    },
    {
        title: "HTML to JSX Convertor",
        description: "This Tool helps you to convert Raw Html to JSX  format to use in your React.js and Next.js projects..",
        category: "Coding Tools",
        path: "/tools/html-to-jsx-convertor",
        Component: <HtmlToJsxTool />,
        online: true
    },
    {
        title: "Css Minifier and Prettifier Tool",
        description: "  Online CSS Minifier takes any form of css code and make it minified,compressed by removing white spaces, newlines, indentation and comments and here You can also Beautify Css to make it easy to read and edit. It reduces file size and optimizes css for your website.",
        category: "Coding Tools",
        path: "/tools/css-minifier-and-prettifier",
        Component: <CssMinifierPrettifier />,
        online: true
    }
    ,
    {
        title: "JSON Minifier Tool",
        description: "Online JSON Minifier takes any form of json code and make it minified,compressed by removing white spaces, newlines, indentation ,etc. It reduces file size and optimizes json for your request.",
        category: "Coding Tools",
        path: "/tools/json-minifier-tool",
        Component: <JsonMinifierPrettifier />,

        online: true
    }
    ,

    {
        title: "Html Minifier and Prettifier Tool",
        description: " Online HTML Minifier takes any form of HTML code and make it minified,compressed by removing white spaces, newlines, indentation and comments and here You can also Beautify Html to make it easy to read and edit. It reduces file size and optimizes css for your website.",
        category: "Coding Tools",
        path: "/tools/html-minifier-and-prettifier",
        Component: <HtmlMinifierPrettifier />,
        online: true
    }
    ,
    {
        title: "Html Parser Tool",
        description: "Online CSS Minifier takes any form of css code and make it minified,compressed by removing white spaces, newlines, indentation and comments and here You can also Beautify Css to make it easy to read and edit. It reduces file size and optimizes css for your website.",
        category: "Coding Tools",
        path: "/tools/html-parser-tool",
        Component: <HtmlParser />,
        online: true
    }
    ,
    {
        title: "Meta Tag Generator",
        description: "Meta tags are used by search engines to help index and to provide relevant content in their Google search results worldwide",
        category: "SEO Tools",
        path: "/tools/meta-tag-generator",
        Component: <MetaTagGenerator />,
        online: true
    }
    ,
    {
        title: "iFrame Embed Code Generator",
        description: "With the help of this tool, you can generate your iframe codes easily with just a click of a button.",
        category: "Other Tools",
        path: "/tools/iframe-generator",
        Component: <IframeGenerator />,
        online: true
    }
]
const Categories = [
    {
        title: "Image Tools",
        path: "/tools/category/image-tools",
        icon: <IoImageOutline />
    }
    // , {
    //     title: "Downloader",
    //     path: "/tools/category/downloader",
    //     icon: <HiOutlineFolderDownload />
    // }
    , {
        title: "Coding Tools",
        path: "/tools/category/coding-tools",
        icon: <BiCodeAlt />
    }, {
        title: "SEO Tools",
        path: "/tools/category/seo-tools",
        icon: <AiOutlineFileSearch />

    }
    //  {
    //     title: "Social Media Tools",
    //     path: "/tools/category/social-media-tools"
    // }, {
    //     title: "Video Tools",
    //     path: "/tools/category/video-tools"
    // }, {
    //     title: "Audio Tools",
    //     path: "/tools/category/audio-tools"
    // },
    ,
    {
        title: "Other Tools",
        path: "/tools/category/other-tools",
        icon: <TbTools />
    }
]

export const CategoryList = Categories
