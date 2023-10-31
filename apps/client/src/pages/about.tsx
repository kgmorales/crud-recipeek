import Head from 'next/head';
// import Accordion from '../components/elements/Accordion';
// import PortfolioFilter from '../components/elements/PortfolioFilter';
import Layout from '../components/layout/Layout';
// import Testimonial from '../components/slider/Testimonial';
// import PricingTable from '../components/sections/PricingTable';
// import MyServices from '../components/sections/MyServices';
// import PartnersLogs from '../components/sections/PartnersLogs';
import AboutHero from '@components/sections/about-hero/AboutHero';
import React from 'react';
import TrendingTopic from '@components/slider/TrendingTopic';

const About: React.FC = (props) => {
  return (
    <>
      <Head>
        <title>Genz - About me</title>
      </Head>
      <Layout>
        <div className="cover-home1">
          <div className="container">
            <div className="row">
              <AboutHero />
              <TrendingTopic />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default About;
