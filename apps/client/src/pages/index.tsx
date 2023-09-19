import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';

import Layout from '@components/layout/Layout';
import Hero from '@components/sections/Hero';
import FeaturedRecipes from '../components/sections/FeaturedRecipes';
import RecentRecipes from '@components/sections/RecentRecipes';
import fetchHome from '@api/pages/home.routes';

const Home: React.FC = () => {
  const { data: home } = useQuery(['home'], async () => await fetchHome());

  return (
    <>
      <Head>
        <title>laMora | Recipes</title>
      </Head>
      <Layout categoryNames={home?.categoryNames}>
        <div className="cover-home1">
          <div className="container">
            <div className="row">
              <div className="col-xl-1" />
              <div className="col-xl-10 col-lg-12">
                <Hero categoryNames={home?.categoryNames} />
                <FeaturedRecipes featured={home?.favorites} />
                <div className="row mt-70">
                  <div className="col-lg-12">
                    <RecentRecipes recent={home?.recent} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
