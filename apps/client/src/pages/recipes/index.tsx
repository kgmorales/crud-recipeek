import React from 'react';

import Head from 'next/head';
import RecipeFilter from '@components/elements/RecipeFilter';
import Layout from '../../components/layout/Layout';

const Recipes: React.FC = (props) => {
  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>
      <Layout>
        <div className="cover-home1">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="text-center mt-70 mb-50">
                  <h2 className="color-gray-300 d-inline-block mb-20 wow animate__animated animate__fadeInUp">
                    Recipes
                  </h2>
                  <p className="text-lg color-gray-300 wow animate__animated animate__fadeInUp">
                    These Recipes keep the Morales Family running
                  </p>
                </div>
                <RecipeFilter />
                {/* <Pagination /> */}
                {/* <MyServices />
                <Testimonial />
                <PartnersLogs /> */}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Recipes;
