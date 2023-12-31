import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import Layout from 'layouts/apps/layout';
import { getSession } from "next-auth/react";
import { NextSeo } from 'next-seo';
import Link from "next/link";
import { SessionUserType } from "src/types/user";

const fetcher = (url :string) => fetch(url).then((res) => res.json());

export default function Dashboard({ user }:{
    user:SessionUserType
}) {


    

    return (<Layout user={user}>
        <NextSeo
            title="Dashboard"
            description="user Dashboard"
            canonical={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/dashboard`}
        />
        <div className="max-full grow">
            <h1 className="text-3xl font-bold">
                Dashboard
                <span className="ml-4 p-2 bg-primary/25 align-middle rounded uppercase text-xs text-primary">
                    {user.account_type}
                </span>
            </h1>


            <p className="text-slate-500 mt-2 line-clamp-3">
                Monitor your usage and plans here.
            </p>
            <p className="text-slate-500 mt-1 text-sm line-clamp-3">
            Upgrade your plan to remove daily limit. 
                <Link href="/pricing" target="_blank" className="hover:underline text-primary/80 hover:text-primary">See pricing</Link>
            </p>
            <section className='mt-8 px-4 sm:px-8 xl:px-0 z-10 mb-10 flex gap-2'>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Top Apps
                        </CardTitle>
                        <CardDescription>
                            Most used Apps by you

                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                      
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Daily Usage
                        </CardTitle>
                        <CardDescription>
                            Your App Usage today
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                            
                            <span className="text-sm text-slate-600 pl-2">of your daily usage Limit</span>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Total Usage
                        </CardTitle>
                        <CardDescription>
                            Your total app usage till now
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                
                    
                    </CardContent>
                </Card>
            </section>

        </div>
    </Layout >)
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