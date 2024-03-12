import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSession } from 'next-auth/react';

import { FULL_DESCRIPTION, TITLE } from 'src/constants/marketplace';
import Wrapper from 'src/layouts/marketplace';
import { Item_types } from 'src/lib/marketplace/item-types';

import ProductCard from 'src/layouts/marketplace/product-card';



export default function Market({ user, products }) {

    return (<>
    
    
        <Wrapper user={user}>
            <section className="w-full p-3  mt-4 ">
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    My Favorites
                </h1>
                <Tabs defaultValue={Item_types[0].id} className="w-full p-3  mt-4">
                    <TabsList className="w-full gap-3">
                        {Item_types.map((item, i) => {
                            return (<TabsTrigger key={i} value={item.id}
                                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white shadow-md shadow-slate-200 data-[state=active]:shadow-primary/30 data-[state=active]:text-white data-[state=active]:bg-gradient-to-l data-[state=active]:from-primary data-[state=active]:to-fuchsia-600  max-w-[240px]">
                                <item.icon className="w-6 h-6   text-inherit" />
                                <span className="text-lg font-semibold text-inherit">{item.label}</span>
                            </TabsTrigger>)
                        })}

                    </TabsList>
                    {Item_types.map((item, i) => {
                        return (<TabsContent value={item.id}>
                            {products.map((product, i) => {
                                return (<ProductCard key={i} product={product} />)
                            })}
                        </TabsContent>)
                    })}
                </Tabs>
                {products.length === 0 && <div className="flex flex-col items-center justify-center gap-2 mt-4 w-full p-5 py-16 bg-white rounded-lg">
                    <h6 className="text-lg font-semibold text-slate-900">No Favorites Products</h6>
                    <p className="text-sm font-medium text-slate-500">
                        You have no favorites products yet
                    </p>
                </div>}
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
        props: {
            user: session.user,
            products: []

        },

    }
}