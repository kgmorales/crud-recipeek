import React from 'react';
import Head from 'next/head';

import Layout from '@components/layout/Layout';
import Hero from '@components/sections/Hero';
import FeaturedRecipes from '@components/sections/featured-recipes/FeaturedRecipes';
import useRecipeCards from '../hooks/useRecipeCards.hook';
import { Recipe } from '@prisma/client';

const getMostRecentRecipes = (recipes: Recipe[] | undefined): Recipe[] => {
  if (!recipes) return [];

  return [...recipes]
    .sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
    )
    .slice(0, 6);
};

const Home: React.FC = (props) => {
  const { recipes } = useRecipeCards();

  const favorites = recipes?.filter((recipe) => recipe.isFavorite).slice(0, 6);
  const recents = getMostRecentRecipes(recipes as Recipe[]);

  return (
    <>
      <Head>
        <title>laMora | home</title>
      </Head>
      <Layout>
        <div className="container">
          <div className="col-xl-12 col-lg-12 text-center">
            <Hero />
            <h2 className="color-gray-300 wow animate__animated animate__fadeInUp">
              Family Favorites
            </h2>
            <p className="text-lg color-gray-400 wow animate__animated animate__fadeInUp">
              Discover our most popular recipes.
            </p>
            <FeaturedRecipes featured={favorites} />
            <div className="row mt-70">
              <div className="col-lg-12 text-center">
                <h2 className="color-gray-300  wow animate__animated animate__fadeInUp">
                  Recent Recipes
                </h2>
                <p className="text-lg color-gray-400 wow animate__animated animate__fadeInUp">
                  Discover our most popular recipes.
                </p>
                <FeaturedRecipes featured={recents} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
