import Head from 'next/head';
import Layout from '../components/layout/Layout';
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
