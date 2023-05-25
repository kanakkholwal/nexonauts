import { getSession } from "next-auth/react";
import DashboardPage from "components/dashboard-page";
import Head from "next/head";
import State from 'components/state';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle } from 'components/Card';
import useSWR from 'swr';
import axios from 'axios';
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
        <State
          loader={{ type: "indeterminate", show: isLoading }}
          alert={{
            type: error ? "danger" : "success",
            message: error ? error.message : "Notifications loaded successfully",
            show: error ? true : false
          }}
        />
        <div className="d-flex justify-content-around align-items-start g-3 flex-wrap">


        <HandlePieChart data={data?.pages} />
       </div>
       </DashboardPage>
    </>
  );
}

function HandlePieChart({ data }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    if (data) {
      const processedData = processData(data);
      setState(processedData);
    }
  }, [data]);

  const processData = (pages) => {
    const series = [];
    const categories = [];

    pages.forEach((page) => {
      const pageType = page.type;
      const pageAnalytics = page.analytics;
      const actionCount = {
        view: 0,
        share: 0,
      };

      pageAnalytics.forEach((analytics) => {
        actionCount[analytics.action]++;
      });

      series.push(pageAnalytics.length);

      categories.push(pageType);
    });

    return {
      series,
      options: {
        chart: {
          type: 'pie',
        },
        labels: categories,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
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
      {state && (
        <Chart
          options={state.options}
          series={state.series}
          type="pie"
          width={380}
        />
      )}
    </Card>
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
