import { IsArray, IsBoolean, IsInt, IsString } from 'class-validator';

export class RecipeDto {
  @IsArray()
  categories: string[];
  @IsString()
  cook_time: string;
  @IsString()
  created: string;
  @IsString()
  difficulty: string;
  @IsString()
  directions: string;
  @IsString()
  hash: string;
  @IsString()
  ingredients: string;
  @IsString()
  image_url: string;
  @IsString()
  name: string;
  @IsString()
  notes: string;
  @IsString()
  nutritional_info: string;
  @IsBoolean()
  on_favorites: boolean;
  @IsString()
  photo: string;
  @IsString()
  photo_url: string;
  @IsString()
  photo_hash: string;
  @IsString()
  prep_time: string;
  @IsInt()
  rating: number;
  @IsInt()
  scale: number;
  @IsString()
  servings: string;
  @IsString()
  source: string;
  @IsString()
  source_url: string;
  @IsString()
  uid: string;
}
