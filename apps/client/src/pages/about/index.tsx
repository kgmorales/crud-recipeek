import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import AboutHero from '@components/sections/about-hero/AboutHero';
import React from 'react';
import ImageSlider from '@components/elements/ImageSlider';
import styles from './about.module.scss';

const About: React.FC = (props) => {
  return (
    <>
      <Head>
        <title>lamora | about</title>
      </Head>
      <Layout>
        <div className={`${styles.container} container`}>
          <AboutHero />
          <ImageSlider />
        </div>
      </Layout>
    </>
  );
};
export default About;
