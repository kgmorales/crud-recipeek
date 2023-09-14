import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import FeaturedRecipes from '../components/sections/FeaturedRecipes';
// import Sidebar2 from '../components/layout/Sidebar2';
import RecentPosts from '../components/sections/RecentPosts4';

export default function Home() {
  return (
    <>
      <Head>
        <title>Lamora | Recipes</title>
      </Head>
      <Layout>
        <div className="cover-home1">
          <div className="container">
            <div className="row">
              <div className="col-xl-1" />
              <div className="col-xl-10 col-lg-12">
                <Hero />
                <FeaturedRecipes />
                {/* <TrendingTopic2 /> */}
                <div className="row mt-70">
                  <div className="col-lg-12">
                    <RecentPosts />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
