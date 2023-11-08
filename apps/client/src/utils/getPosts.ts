import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '@types';

const postsDirectory = path.join(process.cwd(), 'src', 'posts');

export function getPosts(page: number = 1, limit: number = 5): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const posts = fileNames.slice(startIndex, endIndex).map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const paragraphs = content.split('\n\n'); // Split content into paragraphs
    return {
      slug: fileName.replace(/\.md$/, ''),
      content: paragraphs, // Return content as an array of paragraphs
      ...data,
    };
  });

  return posts;
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const paragraphs = content.split('\n\n'); // Split content into paragraphs
  return {
    slug,
    content: paragraphs, // Return content as an array of paragraphs
    ...data,
  } as Post;
}
