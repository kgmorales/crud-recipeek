import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import Breadcrumb from '../../components/elements/breadcrumb/Breadcrumb';
import React from 'react';
import useBlogPosts from '../../hooks/useBlogPosts.hook';

const Blog: React.FC = (props) => {
  const posts = useBlogPosts();

  //TODO: MAKE CONTEXT LIKE RECIPE TO PASS TO [blogSlug].

  console.log(posts);
  return (
    <>
      <Head>
        <title>lamora | blog</title>
      </Head>
      <Layout>
        <div className="container">
          <div className="col-xl-12 pt-30 border-bottom border-gray-800 pb-20">
            <Breadcrumb />
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center p-2 text-center">
            <h2 className="color-gray-300">Blog</h2>
            <p className="color-gray-300 text-base mt-20 wow animate__animated animate__fadeIn">
              Follow the Morales Family as we navigate raising two toddlers and
              providing them with healthy meals.
            </p>
          </div>

          <div className="row">
            <div className="col-xl-10 col-lg-12">
              <div className="box-list-posts mt-40">
                <div className="row">
                  <div className="col-lg-8 m-auto">
                    <div className="box-list-posts mt-30">
                      {posts?.map((post, i) => (
                        <div
                          key={i}
                          className="card-list-posts card-list-posts-small border-bottom border-gray-800 pb-30 mb-30 wow animate__animated animate__fadeIn"
                        >
                          <div className="card-image hover-up">
                            <div className="box-author mb-20">
                              <img
                                src="assets/imgs/page/healthy/author.png"
                                alt="Genz"
                              />
                              <div className="author-info">
                                <h6 className="color-gray-300">Joseph</h6>
                                <span className="color-gray-300 text-sm">
                                  {post.createdAt}
                                </span>
                              </div>
                            </div>
                            <Link
                              className="btn btn-tag bg-gray-800 hover-up"
                              href="/blog-archive"
                            >
                              {post.category}
                            </Link>
                          </div>
                          <div className="card-info">
                            <Link href={`/blog/${post.slug}`}>
                              <h3 className="mb-20 color-gray-300">
                                {post.title}
                              </h3>
                            </Link>
                            <p className="color-gray-300">{post.excerpt}</p>
                            <div className="row mt-20">
                              <div className="col-7">
                                <Link
                                  className="color-gray-700 text-sm mr-15"
                                  href="/blog-archive"
                                >
                                  # Travel
                                </Link>
                                <Link
                                  className="color-gray-700 text-sm"
                                  href="/blog-archive"
                                >
                                  # Lifestyle
                                </Link>
                              </div>
                              <div className="col-5 text-end">
                                <span className="color-gray-700 text-sm timeread">
                                  3 mins read
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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

export default Blog;
