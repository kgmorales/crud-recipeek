import { useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Post } from '../types/pages';

export const usePost = (id: string) => {
  const queryClient = useQueryClient();
  const [post, setPost] = useState<Post | undefined>(undefined);

  useEffect(() => {
    const allBlogPosts = queryClient.getQueryData<Post[]>(['blogPosts']) || [];

    const foundPost = allBlogPosts.find((post) => post.id === id);
    setPost(foundPost);
  }, [id, queryClient]);

  return post;
};
