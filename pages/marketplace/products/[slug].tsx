import { getSession } from "next-auth/react";
import { NextSeo } from 'next-seo';
import { FULL_DESCRIPTION, TITLE } from 'src/constants/marketplace';
import Wrapper from 'src/layouts/marketplace';
import dbConnect from "src/lib/dbConnect";
import { getProductbySlug } from "src/lib/marketplace/server-apis";
import { SessionUserType } from "src/types/user";

type Props = {
    user: SessionUserType | null,
    product: any
}
export default function ProductPage({ user, product }: Props) {
    console.log(product);
    return (<Wrapper user={user}>
        <NextSeo
            title={TITLE}
            description={FULL_DESCRIPTION} />
        <h2>Product Page</h2>
        <pre>{JSON.stringify(product, null, 2)}</pre>

    </Wrapper>)
}

export async function getServerSideProps(context) {


    const session = await getSession(context);
    await dbConnect();

    const product = await getProductbySlug(context.params.slug);
    console.log(product);
    if (!product) {
        return {
            notFound: true,
        }
    }


    return {
        props: {
            user: session?.user,
            product: JSON.parse(JSON.stringify(product))

        },

    }
}