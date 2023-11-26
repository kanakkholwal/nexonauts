//Icons
// import { HiOutlineFolderDownload } from "react-icons/hi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BiCodeAlt } from "react-icons/bi";
import { IoImageOutline } from "react-icons/io5";
import { TbTools } from "react-icons/tb";
//Tools
import CssMinifierPrettifier from "./pages/CssMinifierPrettifier";
import HtmlMinifierPrettifier from "./pages/HtmlMinifierPrettifier";
import Image2Webp from "./pages/Image2Webp";
import JsonMinifierPrettifier from "./pages/JsonMinifierPrettifier";
// import YouTubeDownloader from "./pages/YouTubeDownloader";
import HtmlParser from "./pages/HtmlParser";
import HtmlToJsxTool from "./pages/HtmlToJsx";
import IframeGenerator from "./pages/IframeGenerator";
import MetaTagGenerator from "./pages/MetaTagGenerator";
import SchemaMarkUpGenerator from "./pages/schemaMarkUpGenerator";
// import SvgEncoder from "./pages/svgEncoder";

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
    // {
    //     title: "Svg Encoder",
    //     description: "This tool helps you to encode your svg code to base64 format",
    //     category: "Web Tools",
    //     path: "/tools/svg-encoder",
    //     Component: <SvgEncoder />,
    //     online: true
    // },
    {
        title: "Image to Webp Convertor",
        description: "Image to WebP converter is an online tool that converts images from one format to WebP. WebP is a modern image format developed by Google that offers better compression than other image formats, such as JPEG and PNG. This can lead to smaller file sizes, which can improve the performance of websites and web apps.",
        category: "Image Tools",
        path: "/tools/image-to-webp-convertor",
        Component: <Image2Webp />,
        online: true
    },
    {
        title: "HTML to JSX Convertor",
        description: "The HTML to JSX Converter is a helpful tool that enables developers to seamlessly convert HTML code into JSX (JavaScript XML) syntax, commonly used in React applications. With an HTML to JSX Converter, developers can efficiently transform HTML code into JSX, ensuring the compatibility and efficiency of their React projects.",
        category: "Web Tools",
        path: "/tools/html-to-jsx-convertor",
        Component: <HtmlToJsxTool />,
        online: true
    },
    {
        title: "Css Minifier and Prettifier Tool",
        description: "  Online CSS Minifier takes any form of css code and make it minified,compressed by removing white spaces, newlines, indentation and comments and here You can also Beautify Css to make it easy to read and edit. It reduces file size and optimizes css for your website.",
        category: "Web Tools",
        path: "/tools/css-minifier-and-prettifier",
        Component: <CssMinifierPrettifier />,
        online: true
    }
    ,
    {
        title: "JSON Minifier Tool",
        description: "Online JSON Minifier takes any form of json code and make it minified,compressed by removing white spaces, newlines, indentation ,etc. It reduces file size and optimizes json for your request.",
        category: "Web Tools",
        path: "/tools/json-minifier-tool",
        Component: <JsonMinifierPrettifier />,

        online: true
    }
    ,

    {
        title: "Html Minifier and Prettifier Tool",
        description: " Online HTML Minifier takes any form of HTML code and make it minified,compressed by removing white spaces, newlines, indentation and comments and here You can also Beautify Html to make it easy to read and edit. It reduces file size and optimizes css for your website.",
        category: "Web Tools",
        path: "/tools/html-minifier-and-prettifier",
        Component: <HtmlMinifierPrettifier />,
        online: true
    }
    ,
    {
        title: "Html Parser Tool",
        description: "Online CSS Minifier takes any form of css code and make it minified,compressed by removing white spaces, newlines, indentation and comments and here You can also Beautify Css to make it easy to read and edit. It reduces file size and optimizes css for your website.",
        category: "Web Tools",
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
        title: "Schema MarkUp Generator",
        description: "A Schema Markup Generator is a tool that helps users create structured data markup for their website. Structured data markup is a type of code that provides search engines with additional information about the content on a website, making it easier for search engines to understand and display the content in search results.",
        category: "SEO Tools",
        path: "/tools/schema-markup-generator",
        Component: <SchemaMarkUpGenerator />,
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
        title: "Web Tools",
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
