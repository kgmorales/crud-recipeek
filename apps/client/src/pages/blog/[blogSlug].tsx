import Layout from '../../components/layout/Layout';
import Breadcrumb from '../../components/elements/breadcrumb/Breadcrumb';
import { useBlogPostContext } from '../../contexts/Post';
import { usePost } from '../../hooks/usePost.hook';
import SidebarBlog from '@components/elements/sidebar/SidebarBlog';
import FeaturedBlogDetail from '@components/elements/featured-blog/FeaturedBlogDetail';

const BlogDetails: React.FC = (props) => {
  const { currentPost } = useBlogPostContext();

  const post = usePost(currentPost?.id as string);

  return (
    <>
      <Layout>
        {post && (
          <>
            <div className="container">
              <div className="row">
                <div className="col-xl-1" />
                <div className="col-xl-12">
                  <div className="col-xl-12 pt-30 border-bottom border-gray-800 pb-20">
                    <Breadcrumb />
                  </div>
                  <div className="row mt-50">
                    <div className="col-lg-8">
                      <h2 className="color-gray-300 mb-30">{post?.title}</h2>
                      <FeaturedBlogDetail />
                    </div>
                    <div className="col-lg-4">
                      <SidebarBlog />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default BlogDetails;
