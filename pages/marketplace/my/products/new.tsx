import { getSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { FULL_DESCRIPTION, TITLE } from 'src/constants/marketplace';
import Wrapper from 'src/layouts/marketplace';
import ProductForm from 'src/layouts/marketplace/components/product-form';

export default function Market({ user }) {
    return (<>
        <NextSeo
            title={TITLE}
            description={FULL_DESCRIPTION} />
        <Wrapper user={user}>
            <ProductForm user={user} />
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