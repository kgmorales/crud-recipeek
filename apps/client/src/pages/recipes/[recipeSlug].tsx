import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/layout/Layout';
import Breadcrumb from '../../components/elements/breadcrumb/Breadcrumb';
import { useRecipe } from '@hooks';
import { useRecipeContext } from '../../contexts/Recipe';
import Sidebar from '@components/elements/sidebar/Sidebar';

const RecipeDetails: React.FC = (props) => {
  const { currentRecipe } = useRecipeContext();

  const recipe = useRecipe(currentRecipe?.uid as string).data;

  return (
    <>
      <Head>
        <title>Genz - Portfolio Details</title>
      </Head>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-xl-12 m-auto">
              <div className="row">
                <div className="col-xl-12 pt-30 border-bottom border-gray-800 pb-20">
                  <Breadcrumb />
                </div>
              </div>
              <div className="col-xl-12 p-2">
                <h1 className="color-gray-300 d-flex align-items-center">
                  {recipe?.name}
                </h1>
              </div>
              <div className="row p-4 pl-0">
                <div className="col-xl-8">
                  <div className="img-container">
                    {recipe?.photo_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className="card-image"
                        src={recipe.photo_url}
                        alt="recipe image"
                        // width={800}
                        // height={400}
                      />
                    )}
                  </div>
                </div>
                <div className="col-xl-4">
                  <Sidebar recipe={recipe} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="content-detail border-gray-800">
                <h3 className="color-gray-300 mb-30 wow animate__animated animate__fadeIn">
                  Recipe Details
                </h3>
                <p className="text-lg color-gray-300 wow animate__animated animate__fadeIn">
                  {recipe?.description}
                </p>
                <h3 className="color-gray-300 mt-50 mb-30 wow animate__animated animate__fadeIn">
                  Directions
                </h3>
                <p className="text-lg color-gray-300 wow animate__animated animate__fadeIn">
                  {recipe?.directions}
                </p>
              </div>
              {/* <div className="box-tags wow animate__animated animate__fadeIn">
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
              </div> */}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RecipeDetails;
