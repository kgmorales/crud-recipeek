import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@modules/shared/services/prisma._service'; // Update the path to where your PrismaService is located
import { Blog, BlogCategory, Recipe } from '@prisma/client';
import { CreateBlogDTO } from '../dtos/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new blog category
  async createBlogCategory(name: string): Promise<BlogCategory> {
    return this.prisma.client.blogCategory.create({
      data: { name },
    });
  }

  // Fetch blogs by blog category
  async findBlogsByBlogCategory(categoryName: string): Promise<Blog[]> {
    return this.prisma.client.blog.findMany({
      where: { blogCategory: { name: categoryName } },
    });
  }

  // Fetch all blogs with pagination
  async findAll(skip = 0, take = 10): Promise<Blog[]> {
    return this.prisma.client.blog.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  // Fetch a specific blog by its ID along with its related recipe data
  async findOne(id: number): Promise<Blog & { recipe: Recipe | null }> {
    const blog = await this.prisma.client.blog.findUnique({
      where: { id },
      include: { recipe: true },
    });
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  // Create a new blog
  async create(data: CreateBlogDTO): Promise<Blog> {
    return this.prisma.client.blog.create({
      data: {
        title: data.title,
        content: data.content,
        slug: data.slug,
        categoryId: data.categoryId,
        recipeUID: data.recipeUID,
        // Do not include auto-generated fields here
      },
    });
  }

  // Update a blog by its ID
  async update(id: number, data: Partial<Blog>): Promise<Blog> {
    return this.prisma.client.blog.update({
      where: { id },
      data,
    });
  }

  // Delete a blog by its ID
  async delete(id: number): Promise<Blog> {
    return this.prisma.client.blog.delete({ where: { id } });
  }
}
