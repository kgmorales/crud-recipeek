import React from 'react';
import Head from 'next/head';

import Layout from '@components/layout/Layout';
import Hero from '@components/sections/Hero';
import FeaturedRecipes from '../components/sections/featured-recipes/FeaturedRecipes';
import RecentRecipes from '@components/sections/RecentRecipes';
import { useHome } from '../hooks/useHome';

const Home: React.FC = (props) => {
  const { home } = useHome();

  return (
    <>
      <Head>
        <title>laMora | Recipes</title>
      </Head>
      <Layout>
        <div className="cover-home1">
          <div className="container">
            <div className="row">
              <div className="col-xl-1" />
              <div className="col-xl-10 col-lg-12">
                <Hero />
                <FeaturedRecipes featured={home?.favorites} />
                <div className="row mt-70">
                  <div className="col-lg-12">
                    <RecentRecipes recents={home?.recents} />
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
