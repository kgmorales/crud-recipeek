import Head from 'next/head';
import Layout from '../components/layout/Layout';
import AboutHero from '@components/sections/about-hero/AboutHero';
import React from 'react';
import ImageSlider from '@components/elements/ImageSlider';
import AccordionWrapper from '@components/elements/accordion-wrapper/AccordionWrapper';

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
              <ImageSlider />
              <AccordionWrapper />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default About;
