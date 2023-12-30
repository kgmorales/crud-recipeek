import Head from 'next/head';
import Layout from '../components/layout/Layout';
import AboutHero from '@components/sections/about-hero/AboutHero';
import React from 'react';
import ImageSlider from '@components/elements/ImageSlider';
import AccordionWrapper from '@components/elements/accordion-wrapper/AccordionWrapper';
import RecentPosts2 from '@components/sections/RecentPosts2';
import RecentPosts3 from '@components/sections/RecentPosts3';
import RecentPosts from '@components/sections/RecentPosts';
import RecipeFilter from '@components/elements/RecipeFilter';

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
              <RecentPosts2 />
              <AccordionWrapper />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default About;
