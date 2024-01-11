import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class RecipeDto {
  @IsArray()
  categories: string[];

  @IsString()
  cook_time: string;

  @IsString()
  created: string;

  @IsString()
  description: string;

  @IsBoolean()
  deleted: boolean;

  @IsString()
  difficulty: string;

  @IsString()
  directions: string;

  @IsString()
  hash: string;

  @IsString()
  ingredients: string;

  @IsString()
  in_trash: boolean;

  @IsOptional()
  @IsString()
  image_url: string;

  @IsString()
  is_pinned: boolean;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  notes: string;

  @IsString()
  nutritional_info: string;

  @IsBoolean()
  on_favorites: boolean;

  @IsOptional()
  @IsBoolean()
  on_grocery_list: boolean;

  @IsOptional()
  @IsString()
  photo: string;

  @IsOptional()
  @IsString()
  photo_hash: string;

  @IsOptional()
  @IsString()
  photo_large: string;

  @IsOptional()
  @IsString()
  photo_url: string;

  @IsString()
  prep_time: string;

  @IsInt()
  rating: number;

  @IsString() // Update to IsString()
  scale: string; // Update to string type

  @IsString()
  servings: string;

  @IsString()
  source: string;

  @IsOptional()
  @IsString()
  source_url: string;

  @IsOptional()
  @IsString()
  total_time: string;

  @IsString()
  uid: string;
}
