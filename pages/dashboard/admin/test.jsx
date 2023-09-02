import { GetSessionParams, getSession } from "next-auth/react";
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import { sessionType } from "@/src/types/session";
import dynamic from 'next/dynamic';

// Import the missing CalloutDirectiveDescriptor

const MDXEditor = dynamic(() => import('@mdxeditor/editor/MDXEditor').then((mod) => mod.MDXEditor), { ssr: false })
import Markdown from "markdown-to-jsx"
import { plugins } from "@/components/editor/mdx-editor";
import { useState } from "react";

export default function Dashboard({ user }) {

    const [data,setData] = useState("")
    return (
        <>
            <Head>
                <title>UI Page</title>
            </Head>
            <DashboardPage
                user={user}
                headerChildren={<span className="h5">UI Page</span>}
            >
                <MDXEditor
                    markdown={data}
                    plugins={plugins}
                    onChange={(data) => {
                        console.log(data);
                        setData(data);
                    }}
                />
                previe : 
                <Markdown
                    options={{
                        className:"standardTopography"
                    }}
                >
                    {data}
                </Markdown>
            </DashboardPage>
        </>
    );
}



const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

const simpleSandpackConfig = {
    defaultPreset: 'react',
    presets: [
        {
            label: 'React',
            name: 'react',
            meta: 'live react',
            sandpackTemplate: 'react',
            sandpackTheme: 'light',
            snippetFileName: '/App.js',
            snippetLanguage: 'jsx',
            initialSnippetContent: defaultSnippetContent,
        },
    ],
};

const GenericDirectiveEditor = (props) => {
    const cb = useCodeBlockEditorContext()
    return (
        <div onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}>
            <textarea rows={3} cols={20} defaultValue={props.code} onChange={(e) => cb.setCode(e.target.value)} />
        </div>
    )
}
const CalloutDirectiveDescriptor = {
    name: 'callout',
    testNode(node) {
        return node.name === 'callout'
    },
    // set some attribute names to have the editor display a property editor popup.
    attributes: [],
    // used by the generic editor to determine whether or not to render a nested editor.
    hasChildren: true,
    Editor: GenericDirectiveEditor
}

export async function getServerSideProps(context) {
    const session = (await getSession(context));

    if (!session)
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };

    if (session.user.role !== 'admin') {
        console.log("You are not admin");
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            },
        };
    }

    return {
        props: { user: session.user },
    };
}
