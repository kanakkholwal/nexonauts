import { getSession } from "next-auth/react";
import DashboardPage from "components/dashboard-page";
import { Input, Select } from "components/form-elements";
import Button from "components/buttons";
import { Card } from "components/Card";
import Head from "next/head";
import Link from "next/link";
import State from 'components/state';
import { useEffect, useState, useCallback } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { HiArrowUp } from "react-icons/hi";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "components/table";

const fetcher = url => axios.get(url).then(res => res.data);

export default function Pages({ user }) {
    const { data, error, isLoading } = useSWR('/api/admin/analytics', fetcher);
    const [pages, setPages] = useState(data?.pages || []);
    const [sortedPages, setSortedPages] = useState(data?.pages || []);
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedPages.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        if (data && data.pages !== pages) {
            setPages(data.pages);
        }
    }, [data]);

    const sortPages = useCallback((field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
        const sortedPages = [...pages]; // Create a copy of filtered pages array to avoid mutating the state directly

        if (sortBy && sortOrder) {
            sortedPages.sort((a, b) => {
                const valueA = field === 'viewCount' ? a.analytics.filter(analytic => analytic.action === 'view').length : a[field];
                const valueB = field === 'viewCount' ? b.analytics.filter(analytic => analytic.action === 'view').length : b[field];

                if (valueA < valueB) {
                    return sortOrder === 'asc' ? -1 : 1;
                }
                if (valueA > valueB) {
                    return sortOrder === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        setSortedPages(sortedPages)
    }, [pages, sortBy, sortOrder]);



    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        if (searchQuery && searchQuery.length >= 0) {
            const filteredPages = pages.filter(page =>
                page.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSortedPages(filteredPages);
        } else if (searchQuery === '') {
            setSortedPages(pages);
        }
    }, [searchQuery, pages]);


    return (
        <>
            <Head>
                <title>All Pages</title>
            </Head>
            <DashboardPage
                user={user}
                headerChildren={
                    <>
                        <TbBrandGoogleAnalytics /> All Pages
                    </>
                }
            >
                {!data && (
                    <State
                        loader={{ type: "indeterminate", show: isLoading }}
                        alert={{
                            type: error ? "danger" : "success",
                            message: error ? error.message : "Analytics fetched successfully",
                            show: error ? true : false
                        }}
                    />
                )}
                <Card>


                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                    <TableContainer style={
                        {
                            boxShadow:"none",
                            padding:"0"
                        }
                    }>
                        {data && currentItems.length > 0 ? (<Table
                            style={{
                                padding: "0.5rem",
                                borderRadius: "0.5rem",
                                background: "var(--card-bg)"
                            }}
                        >
                            <Thead>
                                <Tr>
                                    <Th onClick={() => sortPages('title')}>
                                        Name {sortBy === 'title' && sortOrder === 'asc' && <HiArrowUp />}
                                        {sortBy === 'title' && sortOrder === 'desc' && <HiArrowUp style={{ transform: 'rotate(180deg)' }} />}
                                    </Th>
                                    <Th onClick={() => sortPages('type')}>
                                        Type {sortBy === 'type' && sortOrder === 'asc' && <HiArrowUp />}
                                        {sortBy === 'type' && sortOrder === 'desc' && <HiArrowUp style={{ transform: 'rotate(180deg)' }} />}
                                    </Th>
                                    <Th onClick={() => sortPages('viewCount')}>
                                        View Counts {sortBy === 'viewCount' && sortOrder === 'asc' && <HiArrowUp />}
                                        {sortBy === 'viewCount' && sortOrder === 'desc' && <HiArrowUp style={{ transform: 'rotate(180deg)' }} />}
                                    </Th>
                                    <Th onClick={() => sortPages('shareCount')}>
                                        Share Counts {sortBy === 'shareCount' && sortOrder === 'asc' && <HiArrowUp />}
                                        {sortBy === 'shareCount' && sortOrder === 'desc' && <HiArrowUp style={{ transform: 'rotate(180deg)' }} />}
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {currentItems.map((page, index) => (
                                    <Tr key={page._id}>
                                        <Td>
                                            <Link href={`/dashboard/admin/analytics/pages/${page._id}`}>
                                                {page.title}
                                            </Link>
                                        </Td>
                                        <Td>{page.type}</Td>
                                        <Td>{page.analytics.filter((analytic) => analytic.action === 'view').length}</Td>
                                        <Td>{page.analytics.filter((analytic) => analytic.action === 'share').length}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>) : <p>No pages found</p>}
                    </TableContainer>
                    <div className="d-flex align-items-center  justify-content-center g-2">
                        <Button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            level={"true"}
                            size="sm"
                            low="true"
                        >
                            Previous
                        </Button>
                        <Select
                            value={itemsPerPage}
                            options={[
                                { label: '10', value: 10 },
                                { label: '20', value: 20 },
                                { label: '30', value: 30 },
                                { label: '40', value: 40 },
                                { label: '50', value: 50 },

                            ]}
                            onChange={(option) => setItemsPerPage(option.value)}

                        />
                        <Button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={indexOfLastItem >= sortedPages.length}
                            level={"true"}
                            size="sm"
                            low="true"

                        >
                            Next
                        </Button>
                    </div>
                </Card>
            </DashboardPage>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    if (session.user.role !== 'admin') {
        console.log("You are not an admin");
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
