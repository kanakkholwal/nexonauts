import { getSession } from "next-auth/react";
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import Link from 'next/link';
import {Table ,Thead,Tbody,Tr,Th,Td,TableContainer} from "components/table"
import styled from "styled-components";
import useSWR from "swr";
import axios from "axios";
import { useEffect, useState } from "react";

const UserCard = styled.div`
padding:0.5rem 0.75rem;
transition:all 0.25s ease;
display:flex;
align-items:center;
justify-content:space-between;
gap:0.25rem;
border-bottom:1px solid rgba(var(--text-rgb),0.22);

&>div{
    display:flex;
    align-items:center;
    gap:0.25rem;
}
span{
    font-size:1rem;
    font-weight:600;
}
span[email]{
    opacity:0.9;
    font-weight:500;
}
span[class]{
    cursor:pointer;
    padding:0.25rem;
    height:28px;
    aspect-ratio:1;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:50%;
    transition:all 0.25s ease-in-out;
    &:hover{
        background:rgba(var(--theme-rgb),0.1);
        scale:1.1;
    }
}
span.IMPORTANT{

    ${({ type }) => type === "IMPORTANT" ? `
     color:rgba(var(--warning-rgb),1);
    `: `
     color:rgba(var(--theme-rgb),0.8);
    `}
}
span.READ{
    ${({ read }) => read === true ? `
     color:rgba(var(--success-rgb),1);
    `: `
     color:rgba(var(--theme-rgb),0.8);
    `}
}
span.TOGGLE{
    background:rgba(var(--theme-rgb),0.1);
    transition:500ms cubic-bezier(0.4, 0, 0.2, 1);
    &:hover{
        background:rgba(var(--theme-rgb),0.2);
    }
    ${({ open }) => open === true ? `
     color:rgba(var(--success-rgb),1);
     transform:rotate(180deg);
     
    `: `
     color:rgba(var(--theme-rgb),0.8);
     transform:rotate(0deg);
    `}
    
}
`;

const fetchData = async (url, data) => {
    const response = await axios.post(url, data);
    return response.data;
};
export default function Dashboard({ user }) {
  
    const { data, error, isLoading } = useSWR(['/api/admin/users/all', { adminId: user.id }], ([url, data]) => fetchData(url, data))
  
    const [users, setUsers] = useState(data?.users);

    useEffect(() => {
        if (data) {
            if (data.users !== users)
            setUsers(data.users);
        }

    }, [data])


    return (
        <>
            <Head>
                <title>All Users</title>
            </Head>
            <DashboardPage user={user}>
            <TableContainer>
            <Table style={
                        {
                            padding:"0.5rem",
                            borderRadius:"0.5rem",
                            background:"var(--card-bg)"
                        }
                    }>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Email</Th>
                                <Th>Role</Th>
                                <Th>Account Type</Th>
                                <Th>Verified</Th>
                                <Th>Joined On</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data && data.users.length > 0 && users?.sort((a, b) => {
                                return new Date(b.createdAt) - new Date(a.createdAt);
                            }).map(({ name, email, role, account_type, createdAt, verified, _id }, index) => {
                                return (
                                    <Tr key={_id}>
                                        <Td>
                                            <Link href={`/admin/users/${_id}`}>
                                                {name}
                                            </Link>
                                        </Td>
                                        <Td>{email}</Td>
                                        <Td>{role}</Td>
                                        <Td>{account_type}</Td>
                                        <Td>{verified ? "Yes" : "No"}</Td>
                                        <Td>{new Date(createdAt).toLocaleDateString()}</Td>
                                    </Tr>

                                )
                            })}
                        </Tbody>
                    </Table>
                    {!(data && data.users.length > 0) && "No Users Yet"}
            </TableContainer>
                 
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
        props: { user: session.user },
    }
}