import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import AboutHero from '@components/sections/about-hero/AboutHero';
import React from 'react';
import ImageSlider from '@components/elements/ImageSlider';
import AccordionWrapper from '@components/elements/accordion-wrapper/AccordionWrapper';
// import RecentPosts2 from '@components/sections/RecentPosts2';
import styles from './about.module.scss';
import useSpotify from '../../hooks/useSpotify.hook';

const About: React.FC = (props) => {
  const spotify = useSpotify();

  return (
    <>
      <Head>
        <title>lamora | about</title>
      </Head>
      <Layout>
        <div className={`${styles.container} container`}>
          <AboutHero />
          <ImageSlider />
          {/* <RecentPosts2 /> */}
          <AccordionWrapper />
        </div>
      </Layout>
    </>
  );
};
export default About;
