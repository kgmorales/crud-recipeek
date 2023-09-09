import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class RecipeDto {
  @ApiProperty()
  @IsArray()
  categories: string[];

  @ApiProperty()
  @IsString()
  cook_time: string;

  @ApiProperty()
  @IsString()
  created: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsBoolean()
  deleted: boolean;

  @ApiProperty()
  @IsString()
  difficulty: string;

  @ApiProperty()
  @IsString()
  directions: string;

  @ApiProperty()
  @IsString()
  hash: string;

  @ApiProperty()
  @IsString()
  ingredients: string;

  @ApiProperty()
  @IsString()
  in_trash: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image_url: string;

  @ApiProperty()
  @IsString()
  is_pinned: boolean;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  notes: string;

  @ApiProperty()
  @IsString()
  nutritional_info: string;

  @ApiProperty()
  @IsBoolean()
  on_favorites: boolean;

  @ApiProperty()
  @IsBoolean()
  on_grocery_list: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  photo: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  photo_hash: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  photo_large: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  photo_url: string;

  @ApiProperty()
  @IsString()
  prep_time: string;

  @ApiProperty()
  @IsInt()
  rating: number;

  @ApiProperty()
  @IsString() // Update to IsString()
  scale: string; // Update to string type

  @ApiProperty()
  @IsString()
  servings: string;

  @ApiProperty()
  @IsString()
  source: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  source_url: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  total_time: string;

  @ApiProperty()
  @IsString()
  uid: string;
}
