import { getSession } from "next-auth/react";
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState, useCallback } from 'react';
import styled from "styled-components";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import {  Select } from "components/form-elements";
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
    a{
        font-size:1rem;
        font-weight:400;
        color:var(--text-muted);
    }
`;
const StyledInfo = styled.div`
    display:flex;
    justify-content:space-around;
    align-items:center;
    flex-wrap:wrap;
    gap:1rem;
    margin-bottom:1rem;
    background:var(--card-bg);
    padding:1rem;
    h2{
        font-size:1.5rem;
        font-weight:600;
    }
    h5{
        font-size:1rem;
        font-weight:500;
        color:var(--text-muted);
    }
    &>span{
        flex:1 1 18%;
        min-width:100px;
        padding:0.5rem;
        text-align:left;
        &:not(:last-child){
            border-right:1px solid rgba(var(--grey-rgb),0.2);
        }
    }
`;

export default function Pages({ user }) {
    const router = useRouter();
    const { pageId } = router.query;
    const [page, setPage] = useState({});
    const [pageInfo, setPageInfo] = useState(calculateStats(page?.analytics) || {
        today: 0,
        yesterday: 0,
        current_month: 0,
        last_month: 0,
        all_time: 0,
    });
    const [type, setSelectedType] = useState('daily');

    const FetchPage = async (pageId) => {
        try {
            const response = await axios.get('/api/admin/analytics/' + pageId);
            setPage(response.data.page);
            setPageInfo(calculateStats(response.data.page.analytics));
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
                            {page?.title}
                        </h2>
                        <Link href={page?.slug ? page?.slug : '#'} target="_blank">{page.slug}</Link>

                    </div>
                    <div className="d-flex flex-column align-items-end">

                        <Badge nature="info">
                            {page.type}
                        </Badge>
                        <Select 
                        options={[
                            {label:'Daily',value:'daily'},
                            {label:'Weekly',value:'weekly'},
                            {label:'Monthly',value:'monthly'},
                            {label:'3 Months',value:'3months'},
                            {label:'6 Months',value:'6months'},
                            {label:'Yearly',value:'yearly'},
                        ]}
                        onChange={(option)=>setSelectedType(option.value)}

                        />
                    </div>
                </StyledHeader>
                
                <StyledInfo>
                    <span>
                        <h5>All Time</h5>
                        <h2>{pageInfo.all_time}</h2>
                    </span>
                    <span>
                        <h5>Today</h5>
                        <h2>{pageInfo.today}</h2>
                    </span>
                    <span>
                        <h5>Yesterday</h5>
                        <h2>{pageInfo.yesterday}</h2>
                    </span>
                    <span>
                        <h5>This Month</h5>
                        <h2>{pageInfo.current_month}</h2>
                    </span>
                    <span>
                        <h5>Last Month</h5>
                        <h2>{pageInfo.last_month}</h2>

                    </span>

                </StyledInfo>

                <Card>
                   {page && <Stats data={page} type={type}/>}
                   <p className="text-center text-muted">{page?.analytics ? "Page Created on " +new Date(page?.analytics[0]?.timestamp).toLocaleTimeString('en-US',{ day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }) : null}</p>
                </Card>
            </DashboardPage>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
        </>
    );
}
function Stats({ data ,type = 'daily'}) {
    const [state, setState] = useState(null);
  
    useEffect(() => {
      if (data && data.analytics) {
        const processedData = processData(data.analytics);
        setState(processedData);
      }
    }, [data,type]);
  
    const processData = (analytics) => {
        const dailyViews = {};
        const monthlyViews = {};
        const yearlyViews = {};
    
        analytics.forEach((entry) => {
          const date = new Date(entry.timestamp);
          const day = date.getDate();
          const month = date.getMonth();
          const year = date.getFullYear();
          const dayKey = `${day}-${month}-${year}`;
          const monthKey = `${month}-${year}`;
          const yearKey = `${year}`;
    
          dailyViews[dayKey] = (dailyViews[dayKey] || 0) + 1;
          monthlyViews[monthKey] = (monthlyViews[monthKey] || 0) + 1;
          yearlyViews[yearKey] = (yearlyViews[yearKey] || 0) + 1;
        });
    
        const series = () => {
          if (type === 'daily') return Object.values(dailyViews);
          if (type === 'weekly') return Object.values(dailyViews).slice(-7);
          if (type === 'monthly') return Object.values(monthlyViews);
          if (type === '3months') return Object.values(monthlyViews).slice(-3);
          if (type === '6months') return Object.values(monthlyViews).slice(-6);
          if (type === 'yearly') return Object.values(yearlyViews);
          return Object.values(dailyViews);
        };
    
        const labels = () => {
          if (type === 'daily') return Object.keys(dailyViews);
          if (type === 'weekly') return Object.keys(dailyViews).slice(-7);
          if (type === 'monthly') return Object.keys(monthlyViews);
          if (type === '3months') return Object.keys(monthlyViews).slice(-3);
          if (type === '6months') return Object.keys(monthlyViews).slice(-6);
          if (type === 'yearly') return Object.keys(yearlyViews);
          return Object.keys(dailyViews);
        };
    
        const chartData = {
          series: [
            {
              name: 'Views',
              data: series(),
            },
          ],
          options: {
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false,
              },
              fontSize: 12,
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: 5,
              curve: 'smooth',
            },
            xaxis: {
              type: 'category',
              categories: labels(),
            },
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'dark',
                gradientToColors: ['#FDD835'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100],
              },
            },
            yaxis: {
              min: 0,
              max: Math.max(...series()) + 10,
            },
          },
        };
    
        return chartData;
      };
  
    return (
      <>
        {state && (
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            height={350}
          />
        )}
      </>
    );
  }

  function calculateStats(analytics) {
    const stats = {};
  
    // Calculate the stats based on the analytics data
    const currentDate = new Date();
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
  
    // Filter the analytics data for today
    const todayData = analytics?.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      return entryDate >= today;
    }) || [];
    stats['today'] = todayData.length;
  
    // Filter the analytics data for yesterday
    const yesterdayData = analytics?.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      return entryDate >= yesterday && entryDate < today;
    }) || [];
    stats['yesterday'] = yesterdayData.length;
  
    // Filter the analytics data for this month
    const thisMonthData = analytics?.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      return entryDate.getMonth() === currentDate.getMonth() && entryDate.getFullYear() === currentDate.getFullYear();
    }) || [];
    stats['current_month'] = thisMonthData.length;
  
    // Filter the analytics data for last month
    const lastMonthData = analytics?.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
      const thisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      return entryDate >= lastMonth && entryDate < thisMonth;
    }) || [];
    stats['last_month'] = lastMonthData.length;
  
    // Calculate the total count for all time
    stats['all_time'] = analytics?.length || 0;
  
    return stats;
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
