import {
    CardContainer,
    ToolCard
} from "components/tools";
import Layout from 'layouts/apps/layout';
import { useSession } from "next-auth/react";
import Head from 'next/head';
import { ToolList } from "pages/tools/ToolsList";


export default function Tools() {

    const { data: session } = useSession() as any;


    return (
        <Layout user={session?.user}>
            <Head>
                <title>
                    Dev Tools | Nexo
                </title>
            </Head>
            <div className="max-full grow">
                <h1 className="text-3xl font-bold">
                    Developer Tools
                </h1>


                <p className="text-slate-500 mt-2 line-clamp-3">
                    A collection of tools that I have made to make your developer life easier.
                </p>
                <CardContainer>
                    {ToolList.map(({ title, description, path, category, online }, index) => {
                        return <ToolCard className="!bg-slate-100 flex flex-col items-start" path={path} key={index} title={title} description={description} category={category} online={online} index={index} style={{ animationDelay: (0.1 * index) + "s" }} />
                    })}
                </CardContainer>
            </div>

        </Layout>
    )
}