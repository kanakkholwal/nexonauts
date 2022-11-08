import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { useRouter } from 'next/router'
import ToolList from "./ToolsList";
import Loader from "../../components/Loader";

import PageMetaData from "../../components/PageMetaData";

const LoaderObj = {
    title: "Loading...",
    description: "Loading Your Tool ...",
    category: "Unknown",
    Component: <Loader size={60} />,
}


function Tool() {
    const router = useRouter() || {}
    const { toolName } = router.query || {};
    const [component, SetComponent] = useState(LoaderObj);

    useEffect(() => {
        if (ToolList.find(({ path }) => path.split("/").pop() === toolName))
            SetComponent(ToolList.find(({ path }) => path.split("/").pop() === toolName))

    }, [toolName])





    return (
        <>
            <PageMetaData PageTitle={component.title} PageDescription={component.description} />
            <Header title={component.title} description={component.description} />
            <main className="G_MainContent">
                {component.Component}
            </main>
            <Footer />
        </>
    )
}


export default Tool;
