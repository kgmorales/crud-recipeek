import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/layout/Layout';
import Breadcrumb from '../../components/elements/breadcrumb/Breadcrumb';
// import { useRouter } from 'next/router';
import { useRecipe } from '@hooks';
import { useRecipeContext } from '../../contexts/Recipe';
import Image from 'next/image';

const RecipeDetails: React.FC = (props) => {
  const { currentRecipe } = useRecipeContext();

  const recipe = useRecipe(currentRecipe?.uid as string).data;

  return (
    <>
      <Head>
        <title>Genz - Portfolio Details</title>
      </Head>
      <Layout>
        <div className="cover-home3">
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <div className="pt-30 border-bottom border-gray-800 pb-20">
                  <div className="box-breadcrumbs">
                    <Breadcrumb />
                  </div>
                </div>
                <div className="row mt-50 align-items-end">
                  <div className="col-lg-8 m-auto text-center">
                    <h2 className="color-gray-300 d-flex align-items-center">
                      {recipe?.name}
                    </h2>
                  </div>
                </div>
                <div className="mt-30 mb-50 d-flex gap-5 ">
                  <div className="mb-30">
                    {recipe?.photo_url && (
                      <Image
                        // className={styles.image}
                        src={recipe.photo_url}
                        alt="portrait of Kevin Morales"
                        width={800}
                        height={400}
                      />
                    )}
                  </div>
                  <div className="sidebar">
                    <div className="box-sidebar bg-gray-850 border-gray-800">
                      <div className="head-sidebar wow animate__animated animate__fadeIn">
                        <h5 className=" line-bottom color-gray-300 d-flex align-items-center">
                          Recipe Details
                        </h5>
                      </div>
                      <div className="content-sidebar">
                        <div className="list-comments">
                          <div className="item-comment border-gray-800 wow animate__animated animate__fadeIn">
                            <p className="color-gray-200 mb-10 text-uppercase">
                              Category
                            </p>
                            <p className="color-gray-500">
                              Graphic Design, Marketing Kitsz
                            </p>
                          </div>
                          <div className="item-comment border-gray-800 wow animate__animated animate__fadeIn">
                            <p className="color-gray-200 mb-10 text-uppercase">
                              Client
                            </p>
                            <p className="color-gray-500">Orion Coporation</p>
                          </div>
                          <div className="item-comment border-gray-800 wow animate__animated animate__fadeIn">
                            <p className="color-gray-200 mb-10 text-uppercase">
                              Project date
                            </p>
                            <p className="color-gray-500">01 November, 2023</p>
                          </div>
                          <div className="item-comment border-gray-800 wow animate__animated animate__fadeIn">
                            <p className="color-gray-200 mb-10 text-uppercase">
                              Project URL
                            </p>
                            <p className="color-gray-500">
                              <Link className="text-white" href="#">
                                www.orioncoporation.com
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="d-inline-block pt-10 wow animate__animated animate__fadeIn">
                      <div className="d-flex align-item-center">
                        <h6 className="d-inline-block color-gray-500 mr-10">
                          Share
                        </h6>
                        <Link className="icon-media icon-fb" href="#" />
                        <Link className="icon-media icon-tw" href="#" />
                        <Link className="icon-media icon-printest" href="#" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8">
                <div className="content-detail border-gray-800">
                  <h3 className="color-white mb-30 wow animate__animated animate__fadeIn">
                    Project Details
                  </h3>
                  <p className="text-lg color-gray-500 wow animate__animated animate__fadeIn">
                    {recipe?.description}
                  </p>
                  <p className="text-lg color-gray-500 wow animate__animated animate__fadeIn">
                    Tortor placerat bibendum consequat sapien, facilisi facilisi
                    pellentesque morbi. Id consectetur ut vitae a massa a. Lacus
                    ut bibendum sollicitudin fusce sociis mi. Dictum volutpat
                    praesent ornare accumsan elit venenatis. Congue sodales nunc
                    quis ultricies odio porta. Egestas mauris placerat leo
                    phasellus ut sit.
                  </p>
                  <p className="text-center text-lg color-gray-500 wow animate__animated animate__fadeIn">
                    The brand identity
                  </p>
                  <h3 className="color-white mt-50 mb-30 wow animate__animated animate__fadeIn">
                    Hire me
                  </h3>
                  <p className="text-lg color-gray-500 wow animate__animated animate__fadeIn">
                    {recipe?.directions}
                  </p>
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
              <div className="col-lg-4"></div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RecipeDetails;
