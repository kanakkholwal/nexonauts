import Footer from 'layouts/common/footer';
import Header from 'layouts/common/header';
import SectionFeatures from 'layouts/home/section-features';
import SectionHome from 'layouts/home/section-home';
import GetStarted from 'layouts/home/section-started';
import Subscribe from 'layouts/home/section-sub';
import { NextSeo } from 'next-seo';

import Aos from 'aos';
import { useEffect } from 'react';

export default function Home() {
  useEffect(()=>{
    Aos.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  },[])

  return (<>
  <NextSeo
    title={process.env.NEXT_PUBLIC_WEBSITE_NAME ?? "NexoNauts"}
    description='Nexo AI Toolkit is a collection of AI-powered apps that help you to automate your daily tasks.'
    

    />
    <Header />
    <SectionHome/>
    <SectionFeatures/>
    <GetStarted/>
    <Subscribe/>
    <Footer/>
  </>)
}
