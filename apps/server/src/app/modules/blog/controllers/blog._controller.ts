import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BlogService } from '../services/blog._service';
import { CreateBlogDTO } from '../dtos/create-blog.dto';
import { Blog } from '@prisma/client';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Blog> {
    return this.blogService.findOne(id);
  }

  @Post()
  create(@Body() createBlogDto: CreateBlogDTO): Promise<Blog> {
    return this.blogService.create(createBlogDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateBlogDto: CreateBlogDTO,
  ): Promise<Blog> {
    return this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<Blog> {
    return this.blogService.delete(id);
  }

  // If you want to fetch blogs by category:
  @Get('category/:name')
  findBlogsByCategory(@Param('name') name: string): Promise<Blog[]> {
    return this.blogService.findBlogsByBlogCategory(name);
  }
}
