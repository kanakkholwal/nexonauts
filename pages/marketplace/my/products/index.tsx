import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { getSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React from 'react';
import { FULL_DESCRIPTION, TITLE } from 'src/constants/marketplace';
import Wrapper from 'src/layouts/marketplace';
import ProductCard, { ProductCardSkeleton } from 'src/layouts/marketplace/product-card';

const cache = new Map();

const skeleton = new Array(4).fill(0);

export default function Market({ user }) {

    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        if (cache.has("my-products")) {
            setProducts(cache.get("my-products"));
        } else {
            fetch(`/api/marketplace/trending/${user._id}`)
                .then(res => res.json())
                .then(res => {
                    cache.set("my-products", res);
                    setProducts(res);
                }).catch(err => {
                    setError(err);
                }).finally(() => {
                    // setLoading(false);
                })
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
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 md:px-8 ">
            {loading && skeleton.map((_, i) => {
                return (<ProductCardSkeleton key={i} />)
            })}

            {products.map((product, i) => {
                return (<ProductCard key={i} product={product}/>)
            })}
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