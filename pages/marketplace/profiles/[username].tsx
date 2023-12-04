import { getSession } from "next-auth/react";
import { NextSeo } from 'next-seo';
import { FULL_DESCRIPTION, TITLE } from 'src/constants/marketplace';
import Wrapper from 'src/layouts/marketplace';
import { SessionUserType } from "src/types/user";

type Props = {
    user: SessionUserType | null,
    profile: any
}
export default function ProductPage({ user ,profile}: Props) {

    return (<Wrapper user={user}>
        <NextSeo
            title={TITLE}
            description={FULL_DESCRIPTION} />
        <h2>Product Page</h2>
        <pre>{JSON.stringify(profile, null, 2)}</pre>

    </Wrapper>)
}

export async function getServerSideProps(context) {


    const session = await getSession(context);



    return {
        props: {
            user: session?.user,
            profile: JSON.parse(JSON.stringify({
                username: context.params.username,
                name: "John Doe",
                avatar: "https://i.pravatar.cc/300",
            }))

        },

    }
}