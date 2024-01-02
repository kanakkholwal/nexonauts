
interface ToolProp {
    title: string,
    description: string,
    category: string,
    id: string,
    online: boolean
}

export const allDevTools: ToolProp[] = [

    // {
    //     title: "Youtube Downloader",
    //     description: "This Tool helps you to download YouTube Videos in multiple formats",
    //     category: "Downloader",
    //     id: "youtube-downloader",
    //     online: true
    // },
    // {
    //     title: "Svg Encoder",
    //     description: "This tool helps you to encode your svg code to base64 format",
    //     category: "Web Tools",
    //     id: "svg-encoder",
    //     online: true
    // },
    {
        title: "Image to Webp Convertor",
        description: "Image to WebP converter is an online tool that converts images from one format to WebP. WebP is a modern image format developed by Google that offers better compression than other image formats, such as JPEG and PNG. This can lead to smaller file sizes, which can improve the performance of websites and web apps.",
        category: "Image Tools",
        id: "image-to-webp-convertor",
        
        online: true
    },
    // {
    //     title: "HTML to JSX Convertor",
    //     description: "The HTML to JSX Converter is a helpful tool that enables developers to seamlessly convert HTML code into JSX (JavaScript XML) syntax, commonly used in React applications. With an HTML to JSX Converter, developers can efficiently transform HTML code into JSX, ensuring the compatibility and efficiency of their React projects.",
    //     category: "Web Tools",
    //     id: "html-to-jsx-convertor",
    //     online: true
    // },
    {
        title: "Css Minifier and Prettifier Tool",
        description: "Online CSS Minifier takes any form of css code and make it minified,compressed by removing white spaces, newlines, indentation and comments and here You can also Beautify Css to make it easy to read and edit. It reduces file size and optimizes css for your website.",
        category: "Web Tools",
        id: "css-minifier-and-prettifier",
        online: true
    }
    ,
    {
        title: "JSON Minifier Tool",
        description: "Online JSON Minifier takes any form of json code and make it minified,compressed by removing white spaces, newlines, indentation ,etc. It reduces file size and optimizes json for your request.",
        category: "Web Tools",
        id: "json-minifier-tool",

        online: true
    }
    ,

    {
        title: "Html Minifier and Prettifier Tool",
        description: " Online HTML Minifier takes any form of HTML code and make it minified,compressed by removing white spaces, newlines, indentation and comments and here You can also Beautify Html to make it easy to read and edit. It reduces file size and optimizes css for your website.",
        category: "Web Tools",
        id: "html-minifier-and-prettifier",
        online: true
    }
    ,
    {
        title: "Html Parser Tool",
        description: "Online CSS Minifier takes any form of css code and make it minified,compressed by removing white spaces, newlines, indentation and comments and here You can also Beautify Css to make it easy to read and edit. It reduces file size and optimizes css for your website.",
        category: "Web Tools",
        id: "html-parser-tool",
        online: true
    }
    ,
    {
        title: "Meta Tag Generator",
        description: "Meta tags are used by search engines to help index and to provide relevant content in their Google search results worldwide",
        category: "SEO Tools",
        id: "meta-tag-generator",
        online: true
    }
    ,
    {
        title: "Schema MarkUp Generator",
        description: "A Schema Markup Generator is a tool that helps users create structured data markup for their website. Structured data markup is a type of code that provides search engines with additional information about the content on a website, making it easier for search engines to understand and display the content in search results.",
        category: "SEO Tools",
        id: "schema-markup-generator",
        online: true
    }
    // ,
    // {
    //     title: "iFrame Embed Code Generator",
    //     description: "With the help of this tool, you can generate your iframe codes easily with just a click of a button.",
    //     category: "Other Tools",
    //     id: "iframe-generator",
    //     online: true
    // }
].map((tool) => ({
    description: tool.description,
    id: tool.id,
    category: tool.category,
    title: tool.title,
    path: `/dev-tools/${tool.id}`,
    online: tool.online,
}));


