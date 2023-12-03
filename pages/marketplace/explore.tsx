import { getSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { FULL_DESCRIPTION, NAME, TITLE } from 'src/constants/marketplace';
import Wrapper from 'src/layouts/marketplace';
import { Item_types } from 'src/lib/marketplace/item-types';

export default function Market({ user }) {
    return (<>
        <NextSeo
            title={TITLE}
            description={FULL_DESCRIPTION} />
        <Wrapper user={user}>
            <section className="w-full p-3  mt-4 ">
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    Explore
                    <span className="bg-gradient-to-r from-primary to-fuchsia-600 bg-clip-text text-transparent">{NAME}</span>
                </h1>
                <div className="w-full grid grid-cols-4  gap-4 mt-4 md:px-8 ">
                    {Item_types.map((item, i) => {
                        return (<Link key={i}
                            href={item.href}
                            className="flex items-center justify-center gap-2 p-4 rounded-xl bg-white shadow-md shadow-slate-200  transition-all duration-200 max-w-[240px]">
                            <div>
                                <item.icon className="w-12 h-12  text-violet-600" />
                            </div>
                            <div>
                                <h6 className="text-lg font-semibold text-slate-900">{item.label}</h6>
                                <p className="text-sm font-medium text-slate-500">
                                    Trending in {item.label}
                                </p>
                            </div>
                        </Link>)
                    })}
                </div>
            </section>
            <section className="w-full p-3  mt-4 ">
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    Latest Products on
                    <span className="bg-gradient-to-r from-primary to-fuchsia-600 bg-clip-text text-transparent">{NAME}</span>
                </h1>
                <div className="w-full grid grid-cols-4 gap-4 mt-4 md:px-8 ">

                </div>
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