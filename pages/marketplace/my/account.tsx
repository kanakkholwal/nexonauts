import { getSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { FULL_DESCRIPTION, TITLE } from 'src/constants/marketplace';
import Wrapper from 'src/layouts/marketplace';


import { Button } from '@/components/ui/button';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { PlusCircleIcon } from "lucide-react";
export default function Market({ user }) {
    return (<>
        <NextSeo
            title={TITLE}
            description={FULL_DESCRIPTION} />
        <Wrapper user={user}>
            <section className="w-full p-3  mt-4 ">
                <Tabs defaultValue="music" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                        <TabsList className='bg-slate-200 text-slate-700'>
                            <TabsTrigger value="account" className="relative ">
                                Account
                            </TabsTrigger>
                            <TabsTrigger value="Products">
                                Products
                            </TabsTrigger>
                            <TabsTrigger value="live" disabled>
                                Settings
                            </TabsTrigger>
                        </TabsList>
                        <div className="ml-auto mr-4">
                            <Button>
                                <PlusCircleIcon className="mr-2 h-4 w-4" />
                                Add Products
                            </Button>
                        </div>
                    </div>
                    <TabsContent
                        value="account"
                        className="border-none p-0 outline-none"
                    >
                        Account
                    </TabsContent>
                    <TabsContent
                        value="Products"
                        className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                        Products
                    </TabsContent>
                </Tabs>
            </section>



        </Wrapper>
    </>)
}
export async function getServerSideProps(context) {


    const session = await getSession(context);

    if (!session)
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }



    return {
        props: { user: session.user },

    }
}