import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardTitle
} from "@/components/ui/card";
import { getSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowRight } from "react-icons/lu";
import { FULL_DESCRIPTION, TITLE } from 'src/constants/marketplace';
import Wrapper from 'src/layouts/marketplace';

export default function Market({ user }) {
    return (<>
        <NextSeo
            title={TITLE}
            description={FULL_DESCRIPTION} />
        <Wrapper user={user}>
            <section className="w-full p-3  mt-4 grid gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                    <Card className="group hover:shadow-md hover:shadow-slate-200 hover:-translate-y-2 hover:translate-x-2 duration-300 rounded-2xl">
                        <CardContent className="pt-6">
                            <CardTitle>
                                Seller Dashboard
                            </CardTitle>
                            <Image src="/assets/images/seller-dashboard-illustration.png" width={300} height={200} className="mix-blend-multiply h-48 w-72" alt="seller dashboard" />
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full rounded-full mx-auto hover:text-white hover:bg-primary" variant="slate" asChild>
                                <Link href="/marketplace/my/seller-dashboard">
                                    Go to Seller dashboard <LuArrowRight className="ml-2 inline-block w-4 h-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className="group hover:shadow-md hover:shadow-slate-200 hover:-translate-y-2 hover:translate-x-2 duration-300 rounded-2xl">
                        <CardContent className="pt-6">
                            <CardTitle>
                                My Products
                            </CardTitle>
                            <Image src="/assets/images/seller-dashboard-illustration.png" width={300} height={200} className="mix-blend-multiply h-48 w-72" alt="seller dashboard" />
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full rounded-full mx-auto hover:text-white hover:bg-primary" variant="slate" asChild>
                                <Link href="/marketplace/my/products">
                                    Checkout My Products <LuArrowRight className="ml-2 inline-block w-4 h-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

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