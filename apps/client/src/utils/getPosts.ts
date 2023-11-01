// utils/posts.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'public', 'blog-posts');

interface PostData {
  slug: string;
  title?: string;
  date?: string;
  [key: string]: unknown;
}

export function getPosts(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug: fileName.replace(/\.md$/, ''),
      ...data,
    };
  });
}

export function getPostBySlug(slug: string): PostData & { content: string } {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    slug,
    content,
    ...data,
  };
}
