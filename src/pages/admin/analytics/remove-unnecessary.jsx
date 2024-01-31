import { getSession } from "next-auth/react";
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle } from 'components/Card';
import useSWR from 'swr';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Button from "components/buttons";

import AutoComplete from "components/form-elements/AutoComplete";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "components/table";
import { useRouter } from "next/router";

const fetcher = url => axios.get(url).then(res => res.data);

export default function Stats({ user }) {

    const { data, error, isLoading } = useSWR('/api/admin/analytics/unnecessary', fetcher);
    const router = useRouter();
    const { IDS } = router.query;

    const [pages, setPages] = useState(data?.pages || []);
    const [deleteAble, setDeletable] = useState([IDS?.split(',')]);


    // sort out the unnecessary pages with no views and shares and random names and slugs then delete them 
    // and return the number of deleted pages
    const removeUnnecessaryPages = async (IDS) => {
        try {

            const res = await axios.put('/api/admin/analytics/unnecessary', {
                IDS: IDS.map(id => id.toString())
            });
            console.log(res.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (data && data.pages.length !== pages.length) {
            setPages(data.pages);
        }
    }, [data])


    return (
        <>
            <Head>
                <title>Unnecessary Pages</title>
            </Head>
            <DashboardPage user={user}>
                <Card>
                    <CardTitle>Unnecessary Pages</CardTitle>
                    <CardBody>
                        <TableContainer style={
                            {
                                boxShadow: "none",
                                padding: "0"
                            }
                        }>
                            {
                                deleteAble.length > 0 ? (<>
                                    <Button onClick={() => {
                                        removeUnnecessaryPages(deleteAble);
                                        setDeletable([]);
                                    }}>Delete</Button>

                                </>) : null
                            }

                            {data && pages?.length > 0 ? (<Table
                                style={{
                                    padding: "0.5rem",
                                    borderRadius: "0.5rem",
                                    background: "var(--card-bg)"
                                }}
                            >
                                <Thead>
                                    <Tr>
                                        <Th>
                                            {/* selected or not  also when more than one and less then all selected */}
                                            <input type="checkbox" checked={deleteAble.length === pages.length} onChange={(e) => {
                                                if (e.target.checked) {
                                                    setDeletable(pages.map(page => page._id));
                                                }
                                                else {
                                                    setDeletable([]);
                                                }
                                            }} />
                                        </Th>
                                        <Th>
                                            Name
                                        </Th>
                                        <Th >
                                            Type
                                        </Th>
                                        <Th >
                                            View Counts
                                        </Th>
                                        <Th>
                                            Share Counts
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {pages?.map((page, index) => (
                                        <Tr key={index}>
                                            <Td>
                                                <input type="checkbox" checked={deleteAble.includes(page._id)} onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setDeletable([...deleteAble, page._id]);
                                                    }
                                                    else {
                                                        setDeletable(deleteAble.filter(id => id !== page._id));
                                                    }
                                                }} />
                                            </Td>
                                            <Td>
                                                <Link href={`/dashboard/admin/analytics/pages/${page._id}`}>
                                                    {page.title}
                                                </Link>
                                                <br />
                                                <small>{page.slug}</small>
                                            </Td>
                                            <Td>{page.type}</Td>
                                            <Td>{page.analytics.filter((analytic) => analytic.action === 'view').length}</Td>
                                            <Td>{page.analytics.filter((analytic) => analytic.action === 'share').length}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>) : <p>No pages found</p>}
                        </TableContainer>
                    </CardBody>
                </Card>

            </DashboardPage>
            <Toaster
                position="bottom-center"
            />
        </>
    );
}





export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session)
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };

    if (session.user.role !== 'admin') {
        console.log("You are not admin");
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            },
        };
    }

    return {
        props: { user: session.user },
    };
}
