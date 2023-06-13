import { getSession } from "next-auth/react";
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState, useCallback } from 'react';
import styled from "styled-components";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import { Input, Select } from "components/form-elements";
import Button from "components/buttons";
import Badge from "components/topography/badge";
import { Card } from "components/Card";
import Link from "next/link";
import axios from 'axios';
import { TbBrandGoogleAnalytics } from "react-icons/tb";


const StyledHeader = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    flex-wrap:wrap;
    gap:1rem;
    margin-bottom:1rem;
    h2{
        font-size:1.5rem;
        font-weight:600;
    }
    h5{
        font-size:1rem;
        font-weight:400;
        color:var(--text-muted);
    }
`;

export default function Pages({ user }) {
    const router = useRouter();
    const { pageId } = router.query;
    const [page, setPage] = useState({});

    const FetchPage = async (pageId) => {
        try {
            const response = await axios.get('/api/admin/analytics/' + pageId);
            setPage(response.data.page);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (pageId) {
            toast.promise(FetchPage(pageId), {
                loading: 'Getting the data',
                success: 'Got the data',
                error: 'Error when fetching',
            });
        }
    }, []);



    return (
        <>
            <Head>
                <title>All Pages</title>
            </Head>
            <DashboardPage
                user={user}
                headerChildren={
                    <>
                        <TbBrandGoogleAnalytics /> Page Stats
                    </>
                }
            >
                <StyledHeader>
                    <div>
                        <h2>
                            {page.title}
                        </h2>
                        <h5>
                            {page.slug}
                        </h5>

                    </div>
                    <div>

                        <Badge nature="info">
                            {page.type}
                        </Badge>
                    </div>
                </StyledHeader>

                <Card>
                   {page && <Stats data={page} />}
                </Card>
            </DashboardPage>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
        </>
    );
}
function Stats({ data }) {
    const [state, setState] = useState(null);
  
    useEffect(() => {
      if (data && data.analytics) {
        console.log(data);
        const processedData = processData(data.analytics);
        setState(processedData);
      }
    }, [data]);
  
    const processData = (analytics) => {
        // sample  = { 
        //     "sessionId": "60a5b1b3-0b7a-4f1a-8f0a-0b0a0b0a0b0a",
        //     "user": "60a5b1b3-0b7a-4f1a-8f0a-0b0a0b0a0b0a",
        //     "action": "view",
        //     "timestamp": "2021-05-20T15:00:00.000Z"
        // }
        // get daily views
        const dailyViews = analytics.reduce((acc, curr) => {
            const date = new Date(curr.timestamp);
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();
            const key = `${day}-${month}-${year}`;
            if (acc[key]) {
                acc[key] += 1;
            } else {
                acc[key] = 1;
            }
            return acc;
        }, {});
        // weekly views
        // const weeklyViews = analytics.reduce((acc, curr) => {
        //     const date = new Date(curr.timestamp);
        //     const week = date.getWeek();
        //     const year = date.getFullYear();
        //     const key = `${week}-${year}`;
        //     if (acc[key]) {
        //         acc[key] += 1;
        //     } else {
        //         acc[key] = 1;
        //     }
        //     return acc;
        // }, {});
        // monthly views
        const monthlyViews = analytics.reduce((acc, curr) => {
            const date = new Date(curr.timestamp);
            const month = date.getMonth();
            const year = date.getFullYear();
            const key = `${month}-${year}`;
            if (acc[key]) {
                acc[key] += 1;
            } else {
                acc[key] = 1;
            }
            return acc;
        }, {});
        // yearly views
        const yearlyViews = analytics.reduce((acc, curr) => {
            const date = new Date(curr.timestamp);
            const year = date.getFullYear();
            const key = `${year}`;
            if (acc[key]) {
                acc[key] += 1;
            } else {
                acc[key] = 1;
            }
            return acc;
        }, {});
        console.log(dailyViews);
        const series = Object.values(dailyViews);
        const labels = Object.keys(dailyViews);

        


      const data = { series, labels };
      console.log(data);
  
      return {
        series: [{
            name: 'Views',
            data: data.series
        }],
          options: {
              chart: {
                height: 350,
                type: 'line',
                zoom: {
                  enabled: false
                },
                  fontSize: 12, // Ensure this property is defined
              },
               dataLabels: {
                enabled: false
              },
        
              stroke: {
                  width: 5,
                  curve: 'smooth'
              },
              xaxis: {
                type: 'date',
                // categories: data.labels,
                // tickAmount: 10,
                labels: data.labels
              },
              fill: {
                type: 'gradient',
                gradient: {
                  shade: 'dark',
                  gradientToColors: [ '#FDD835'],
                  shadeIntensity: 1,
                  type: 'horizontal',
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0, 100, 100, 100]
                },
              },
            
              yaxis: {
                min: -10,
                max: 40
              }
          },
      };
    };
  
    return (
      <>
        {state && (
          <Chart
            options={state.options}
            series={state.series}
          />
        )}
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
