import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateBlogDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @IsString()
  recipeUID?: string;
}
