import { Post } from '@types';

export async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch('http://192.168.172.156:8080/api/blog/posts');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data: Post[] = await response.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching all recipes:', error);
    throw new Error('Error fetching all recipes: ' + error.message);
  }
}

export default fetchPosts;
