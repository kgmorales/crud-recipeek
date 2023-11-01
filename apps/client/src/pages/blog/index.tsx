import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import PopularCategories from '../../components/sections/PopularCategories';
import Pagination from '../../components/elements/Pagination';
import PageHeader1 from '../../components/elements/PageHeader1';
import { getPosts } from '@utils/getPosts';
import { InferGetStaticPropsType } from 'next';
import { Post } from '../../types/pages/blog.types';

const Blog: React.FC<{ posts: Post[] }> = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <Head>
      <title>Genz - Blog archive 2</title>
    </Head>
    <Layout>
      <div className="cover-home3">
        <div className="container">
          <div className="row">
            <div className="col-xl-1" />
            <div className="col-xl-10 col-lg-12">
              <PageHeader1
                title={'Travel Tips'}
                des={
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis nisi sed turpis vulputate viverra. Morbi ligula elit, hendrerit non nisl tincidunt, sodales consequat magna.'
                }
              />
              <div className="box-list-posts mt-40">
                <div className="row">
                  <div className="col-lg-8">
                    <div className="box-list-posts">
                      {posts.slice(0, 5).map((item, i) => (
                        <div key={item.slug}>
                          <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                          <p>{item.excerpt}</p>
                          {/* ... other post details */}
                        </div>
                      ))}
                    </div>
                    <Pagination />
                  </div>
                  {/* <div className="col-lg-4">
                    <Sidebar />
                  </div> */}
                </div>
              </div>
              <div className="mb-10" />
              <PopularCategories />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  </>
);

export const getStaticProps = async () => {
  const posts = getPosts();

  console.log('Posts Data:', posts);

  return {
    props: { posts },
  };
};

export default Blog;
