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

  @IsBoolean()
  deleted: boolean;

  @IsString()
  difficulty: string;

  @IsString()
  directions: string;

  @IsString()
  hash: string;

  @IsOptional()
  @IsString()
  image_url: string;

  @IsString()
  ingredients: string;

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
  @IsString()
  photo: string;

  @IsOptional()
  @IsString()
  photo_hash: string;

  @IsString()
  prep_time: string;

  @IsInt()
  rating: number;

  @IsOptional()
  @IsInt()
  scale: number;

  @IsString()
  servings: string;

  @IsString()
  source: string;

  @IsOptional()
  @IsString()
  source_url: string;

  @IsString()
  uid: string;
}
