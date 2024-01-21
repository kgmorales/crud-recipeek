import { useQuery } from '@tanstack/react-query';
import fetchPosts from '@api/posts/posts.routes';

export const usePosts = () => {
  const allPostsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  return allPostsQuery.data;
};

export default usePosts;
