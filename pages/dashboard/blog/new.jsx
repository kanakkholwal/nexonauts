import { hasToken, getUser } from 'lib/checkUser'
import DashboardPage, { Header } from "components/dashboard-page";
import Button from "components/buttons";
import { Card, CardHeader, CardBody } from "components/Card";
import { Input, FormElement, Label, TextArea } from "components/form-elements";
import Head from "next/head";
import Link from 'next/link';
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'

const EditorJs = dynamic(() => import("components/editor"), {
    ssr: false,
});
export default function NewPost({ user }) {

    const [title, setTitle] = useState("");


    return (
        <>
            <Head>
                <title>New Post</title>
            </Head>
            <DashboardPage user={user}>
                <Header>
                    <Button as={Link} level="true" href="/dashboard/blog">
                        Go Back
                    </Button>
                </Header>
                <Card className="flex-row">
                    <FormElement className="mb-0">
                        <Input type="text" placeholder="Write a post title..." underlined value={title}

                            onChange={(e) => setTitle(e.target.value)} />
                    </FormElement>
                    <Button>
                        Publish
                    </Button>
                </Card>
                <div className="d-flex align-items-start justify-content-between g-3 mt-3">
                    <Card>
                        {
                            EditorJs ? <EditorJs
                                defaultValue={{
                                    time: 1635603431943,
                                    blocks: [],
                                }}
                                onChange={(api, event) => console.log("sample")}
                                onReady={() => console.log("ready")}
                                onSave={(d) => {
                                    console.log("SAVED");
                                    console.log(d);
                                }}

                            /> : null
                        }

                    </Card>
                    <Card >
                        <h5>Post Settings</h5>

                    </Card>
                </div>
            </DashboardPage>
        </>
    )
}


export async function getServerSideProps(context) {

    const token = await hasToken(context.req);

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    const user = await getUser(context.req);




    return {
        props: { user },

    }
}