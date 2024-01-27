import { getSession } from "next-auth/react";
import DashboardPage from "components/dashboard-page";
import { AnalyticCard, DashCard, Icon } from "components/dashboard-page/elements";
import Head from "next/head";
// import State from 'components/state';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle } from 'components/Card';
import { intervalWise, authWise, pageWise,getPopularPages, ConversionRate, getAnalyticsByAction, getAnalytics } from 'lib/analytics';
import useSWR from 'swr';
import axios from 'axios';
import { AiOutlineEye } from "react-icons/ai";
import { IoShareSocialOutline } from "react-icons/io5";
import { HiOutlineRefresh } from "react-icons/hi";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const fetcher = url => axios.get(url).then(res => res.data);

export default function Stats({ user }) {

  const { data, error, isLoading } = useSWR('/api/admin/analytics', fetcher);



  return (
    <>
      <Head>
        <title>Analytics</title>
      </Head>
      <DashboardPage user={user}>
        {/* {!data && (<State
          loader={{ type: "indeterminate", show: isLoading }}
          alert={{
            type: error ? "danger" : "success",
            message: error ? error.message : "Analytics fetched successfully",
            show: error ? true : false
          }} />)} */}

        <div className="d-flex justify-content-start align-items-start g-3 mb-3 flex-wrap">
          <DashCard width={"16rem"}>
            <div>
              <span>Total Activities</span>
              <h2>{data ? getAnalytics(data.pages).length : 0}</h2>
            </div>
            <Icon>
              <TbBrandGoogleAnalytics />
            </Icon>
          </DashCard>
          <DashCard width={"16rem"}>
            <div>
              <span>Total Views</span>
              <h2>{data ? getAnalyticsByAction(data.pages, "view").length : 0}</h2>
            </div>
            <Icon>
              <AiOutlineEye />
            </Icon>
          </DashCard>
          <DashCard width={"16rem"}>
            <div>
              <span>Total Shares</span>
              <h2>{data ? getAnalyticsByAction(data.pages, "share").length : 0}</h2>
            </div>
            <Icon>
              <IoShareSocialOutline />
            </Icon>
          </DashCard>
          <DashCard width={"16rem"}>
            <div>
              <span>Conversion</span>
              <h2>{data ?
                parseFloat(ConversionRate(data.pages, "week").currentConversionRate - ConversionRate(data.pages, "week").pastConversionRate >= 0)
                  ? "+" + parseFloat(ConversionRate(data.pages, "week").currentConversionRate - ConversionRate(data.pages, "week").pastConversionRate)
                  :
                  " - " + parseFloat(ConversionRate(data.pages, "week").currentConversionRate - ConversionRate(data.pages, "week").pastConversionRate) : 0.0}</h2>
            </div>
            <Icon>
              <HiOutlineRefresh />
            </Icon>
          </DashCard>
        </div>
        <div className="d-flex justify-content-around align-items-start g-3 flex-wrap">


          {/* <IntervalWise data={data?.pages} /> */}
          <PageTypeWise data={data?.pages} />
          <SessionTypeWise data={data?.pages} />


        </div>
      </DashboardPage>
    </>
  );
}
function IntervalWise({ data }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    if (data) {
      const processedData = processData(data);
      setState(processedData);
    }
  }, [data]);

  const processData = (pages) => {
    const data = intervalWise(pages, 'hourly')
    console.log(data);



    return {
      series: data.series,
      options: {
        chart: {
          type: 'line',
          zoom: {
            enabled: false
          },
          fontSize: 12, // Ensure this property is defined
        },
        xaxis: data.xaxis,
        title: {
          text: 'Visitor Trends by ' + 'hourly',
          align: 'left'
        },
        dataLabels: {
          enabled: false
        }

      },
    };
  };

  return (
    <AnalyticCard>
      {state && (
        <Chart
          options={state.options}
          series={state.series}
          // type="line"
          height={480}
        />
      )}
    </AnalyticCard>
  );
}
function PageTypeWise({ data }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    if (data) {
      const processedData = processData(data);
      setState(processedData);
    }
  }, [data]);

  const processData = (pages) => {
    const data = pageWise(pages) || { series: [], labels: [] };
    console.log(data);

    return {
      series: data.series,
      options: {
        chart: {
          type: 'pie',
        },
        labels: data.labels,
        responsive: [{
          breakpoint: 400,
          options: {
            chart: {
              width: 400,
              height: 480,

            },
            legend: {
              position: 'bottom',
            },
          },
        }],
      },
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Views</CardTitle>
        {/* <Select onChange={e => setFilter(e.target.value)} value={filter}/> */}
      </CardHeader>
      {state && (
        <Chart
          options={state.options}
          series={state.series}
          type="pie"
          height={480}
        />
      )}
    </Card>
  );
}
function SessionTypeWise({ data }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    if (data) {
      const processedData = processData(data);
      setState(processedData);
    }
  }, [data]);

  const processData = (pages) => {
    const data = authWise(pages)
    console.log(data);

  
    return {
      series: data.series,
      options: {
        chart: {
          type: 'donut',
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 90,
            offsetY: 10
          }
        },
        grid: {
          padding: {
            bottom: -80
          }
        },
        labels: data.labels,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]

      },
    };
  };

  return (
    <AnalyticCard>
      {state && (
        <Chart
          type="donut"
          options={state.options}
          series={state.series}
          height={480}
        />
      )}
    </AnalyticCard>
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
