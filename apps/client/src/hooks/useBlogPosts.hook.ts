import { useQuery } from '@tanstack/react-query';
import fetchPosts from '@api/posts/posts.routes';

export const useBlogPosts = () => {
  const allBlogPostsQuery = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchPosts,
  });

  return allBlogPostsQuery.data;
};

export default useBlogPosts;
