import React from 'react';
import Head from 'next/head';

import Layout from '@components/layout/Layout';
import Hero from '@components/sections/Hero';
import FeaturedRecipes from '@components/sections/featured-recipes/FeaturedRecipes';
import { useHome } from '@hooks';
import useRecipeCards from '../hooks/useRecipeCards.hook';

const Home: React.FC = (props) => {
  const { home, isHomeLoaded } = useHome();
  useRecipeCards(isHomeLoaded);

  return (
    <>
      <Head>
        <title>laMora | Recipes</title>
      </Head>
      <Layout>
        <div className="cover-home1">
          <div className="container">
            <div className="col-xl-12 col-lg-12 text-center">
              <Hero />
              <h2 className="color-gray-300 wow animate__animated animate__fadeInUp">
                Family Favorites
              </h2>
              <p className="text-lg color-gray-400 wow animate__animated animate__fadeInUp">
                Discover our most popular recipes.
              </p>
              <FeaturedRecipes featured={home?.favorites} />
              <div className="row mt-70">
                <div className="col-lg-12 text-center">
                  <h2 className="color-gray-300  wow animate__animated animate__fadeInUp">
                    Recent Recipes
                  </h2>
                  <p className="text-lg color-gray-400 wow animate__animated animate__fadeInUp">
                    Discover our most popular recipes.
                  </p>
                  <FeaturedRecipes featured={home?.recents} />
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
