import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/layout/Layout';
import Breadcrumb from '../../components/elements/breadcrumb/Breadcrumb';
import { useRecipe } from '@hooks';
import { useRecipeContext } from '../../contexts/Recipe';
import Sidebar from '@components/elements/sidebar/SidebarRecipe';

const RecipeDetails: React.FC = (props) => {
  const { currentRecipe } = useRecipeContext();

  const recipe = useRecipe(currentRecipe?.uid as string);
  const directions = recipe?.directions?.split('\n');

  console.log(recipe);

  return (
    <>
      <Head>
        <title>lamora | {recipe?.name}</title>
      </Head>
      <Layout>
        <div className="container">
          <div className="col-xl-12 pt-30 border-bottom border-gray-800 pb-20">
            <Breadcrumb />
          </div>
          <div className="col-xl-8 p-2">
            <h2 className="color-gray-300 d-flex align-items-center">
              {recipe?.name}
            </h2>
          </div>
          <div className="row">
            <div className="col-xl-6">
              <Sidebar recipe={recipe} />
            </div>
            <div className="col-xl-6">
              <div className="img-container">
                {recipe?.imageURL && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="card-image"
                    src={recipe.imageURL}
                    alt="recipe image"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="content-detail border-gray-800">
            <h4 className="color-gray-300 mb-10 wow animate__animated animate__fadeIn">
              Description
            </h4>
            <p className="text-lg color-gray-300 wow animate__animated animate__fadeIn">
              {recipe?.description}
            </p>
            <h4 className="color-gray-300 mt-50 mb-10 wow animate__animated animate__fadeIn">
              Directions
            </h4>
            <ul>
              {directions?.map((direction, i) => (
                <ol
                  key={i}
                  className="text-lg color-gray-300 wow animate__animated animate__fadeIn"
                >
                  {direction}
                </ol>
              ))}
            </ul>
          </div>
          <div className="box-tags wow animate__animated animate__fadeIn">
            <Link
              className="btn btn-tags bg-gray-850 border-gray-800 mr-10 hover-up"
              href="blog-archive"
            >
              #Nature
            </Link>
            <Link
              className="btn btn-tags bg-gray-850 border-gray-800 mr-10 hover-up"
              href="blog-archive"
            >
              #Beauty
            </Link>
            <Link
              className="btn btn-tags bg-gray-850 border-gray-800 mr-10 hover-up"
              href="blog-archive"
            >
              #Travel Tips
            </Link>
            <Link
              className="btn btn-tags bg-gray-850 border-gray-800 hover-up"
              href="blog-archive"
            >
              #House
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RecipeDetails;
