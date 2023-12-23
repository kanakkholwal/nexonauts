import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { GetSessionParams, getSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React from 'react';
import { FULL_DESCRIPTION, TITLE } from 'src/constants/marketplace';
import Wrapper from 'src/layouts/marketplace';
import { ProductCardOnDashboard } from 'src/layouts/marketplace/product-card';
import dbConnect from 'src/lib/dbConnect';
import { getMyProducts } from 'src/lib/marketplace/server-apis';
import { statsProductType } from 'src/types/product';
import { sessionType } from 'src/types/session';
import { SessionUserType } from 'src/types/user';
const cache = new Map();



export default function Market({ user, myproducts }: {
    user: SessionUserType,
    myproducts: statsProductType[]
}) {

    const [products, setProducts] = React.useState<statsProductType[]>([]);



    React.useEffect(() => {
        if (cache.has("my-products")) {
            setProducts(cache.get("my-products"));
        } else {
            setProducts(myproducts);
            cache.set("my-products", myproducts);
        }
    }, [user])

    return (<>
        <NextSeo
            title={TITLE}
            description={FULL_DESCRIPTION} />
        <Wrapper user={user}>
            <section className="w-full p-3  mt-4 ">
                <div className='flex justify-between items-center bg-white p-4 rounded-lg'>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        My Products
                    </h1>
                    <Button asChild>
                        <Link href='/marketplace/my/products/new'>
                            <Plus className='mr-2 w-4 h-6' />Add Product
                        </Link>
                    </Button>
                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 md:px-8 ">


                    {products.map((product, i) => {
                        return (<Link key={i} href={"/marketplace/my/seller-dashboard/" + product.slug}><ProductCardOnDashboard  product={product} /></Link>)
                    })}
                </div>
            </section>



        </Wrapper>
    </>)
}
export async function getServerSideProps(context: GetSessionParams) {


    const session = await getSession(context) as sessionType | null;

    if (!session)
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }

    await dbConnect();

    const myproducts = await getMyProducts(session?.user)


    return {
        props: {
            user: session?.user,
            myproducts: JSON.parse(JSON.stringify(myproducts))
        },

    }
}