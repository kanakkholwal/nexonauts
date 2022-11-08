import ToolList from "./ToolsList";
// import { Helmet } from 'react-helmet';

export default function GetTool({ toolName }) {
    const { Component } = ToolList.find(({ path }) => path.split("/").pop() === toolName);

    // <Helmet>
    //     <title>{title + " | " + category}</title>
    //     <meta name="description" content={description} />
    //     <meta name="theme-color" content="#008f68" />
    // </Helmet>
    return Component
}