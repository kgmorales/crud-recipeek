import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '../dtos/post.dto';

@Injectable()
export class BlogService {
  private postsDirectory = path.join(
    process.cwd(),
    'apps/server/src/app/modules/blog/posts',
  );

  async getAllPosts(): Promise<Post[]> {
    const fileNames = fs.readdirSync(this.postsDirectory);
    return await Promise.all(
      fileNames.map((fileName) => {
        const fullPath = path.join(this.postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          slug: fileName.replace(/\.md$/, ''),
          title: data.title,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          category: data.category,
          recipeUID: data.recipeUID,
          content: content.split('\n'), // Assuming you want to split the content into lines
          id: data.id,
          img: data.img,
          excerpt: data.excerpt,
        };
      }),
    );
  }
}
