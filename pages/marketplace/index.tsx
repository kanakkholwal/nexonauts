import { getSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import Wrapper from 'src/layouts/marketplace';

export default function Store({user}){
    return (<>
    <NextSeo
    title={"Nexo Store - Nexo AI Toolkit"}
    description='Nexo Store - Nexo AI Toolkit' />
    <Wrapper user={user}>
    Store

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