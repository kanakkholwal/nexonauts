import { getSession } from "next-auth/react";
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import Link from 'next/link';
import { Card ,CardTitle,CardDescription} from "components/Card"
import styled from "styled-components";
import { FaRegUser } from "react-icons/fa";
import { TbBrandGoogleAnalytics } from "react-icons/tb";

const DashCard = styled(Card)`
max-width:350px;
flex:1 1 auto;
display:inline-flex;
align-items:center;
flex-direction:row;
gap:0.75rem;
`;
const Icon = styled.div`
flex:1 1 auto;
color:rgba(var(--theme-rgb),0.5);
display:inline-flex;
align-items:center;
justify-content:center;
background:rgba(var(--theme-rgb),0.1);
border-radius:0.5rem;
padding:0.5rem;
aspect-ratio:1;
max-width:200px;
max-height:120px;
svg{
    font-size:48px;
    margin:auto;
    aspect-ratio:1;
}
`;
export default function Dashboard({ user }) {




    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <DashboardPage user={user}>
            <div className="d-flex justify-content-start g-3 align-items-center my-2 flex-wrap">
            <DashCard as={Link} href="/dashboard/admin/users">
                        <Icon>
                            <FaRegUser />
                        </Icon>
                        <div>
                            <h6>Update User</h6>
                            <p>Update any user information</p>
                        </div>
                    </DashCard>
            </div>
                Admin Dashboard
                <Link href="/dashboard/admin/users">
                    Users
                </Link>
                <Link href="/dashboard/admin/messages">
                    Users
                </Link>

            </DashboardPage>
        </>
    )
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

    if (session.user.role !== 'admin') {
        console.log("You are not admin");
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false
            }
        }
    }


    return {
        props: { user:session.user },
    }
}