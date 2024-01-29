import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '../dtos/post.dto';
import { ContentSection } from '@server/types/post.types';

@Injectable()
export class BlogService {
  private postsDirectory = path.join(
    process.cwd(),
    'apps/server/src/app/modules/blog/posts',
  );

  async getAllPosts(): Promise<Post[]> {
    const fileNames = fs.readdirSync(this.postsDirectory);
    return await Promise.all(
      fileNames.map(async (fileName) => {
        const fullPath = path.join(this.postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Split the content by lines and then group by headings
        const lines = content.split('\n');
        const contentSections: ContentSection[] = [];
        let currentHeading = '';
        let currentContent: string[] = [];

        lines.forEach((line) => {
          if (line.startsWith('##')) {
            // Assuming top-level headings are used for sections
            // Save the previous section if it exists
            if (currentHeading) {
              contentSections.push({
                heading: currentHeading,
                content: currentContent.join('\n'),
              });
            }
            // Start a new section
            currentHeading = line.substring(2); // Remove '# ' from the heading
            currentContent = [];
          } else {
            currentContent.push(line);
          }
        });

        // Don't forget to add the last section
        if (currentHeading) {
          contentSections.push({
            heading: currentHeading,
            content: currentContent.join('\n'),
          });
        }

        return {
          slug: fileName.replace(/\.md$/, ''),
          title: data.title,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          category: data.category,
          recipeUIDs: data.recipeUIDs,
          contentSections, // Replace 'content' with 'contentSections' which is an array of sections
          id: data.id,
          img: data.img,
          excerpt: data.excerpt,
        };
      }),
    );
  }
}
