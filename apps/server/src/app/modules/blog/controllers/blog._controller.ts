import { Controller, Get } from '@nestjs/common';
import { BlogService } from '../services/blog._service';
import { Post } from '../dtos/post.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('posts')
  getPosts(): Promise<Post[]> {
    return this.blogService.getAllPosts();
  }
}
