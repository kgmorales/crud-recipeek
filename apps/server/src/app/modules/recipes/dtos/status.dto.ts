import { IsInt } from 'class-validator';

export class StatusDto {
  @IsInt()
  bookmarks: number;

  @IsInt()
  categories: number;

  @IsInt()
  groceries: number;

  @IsInt()
  groceryaisles: number;

  @IsInt()
  groceryingredients: number;

  @IsInt()
  grocerylists: number;

  @IsInt()
  meals: number;

  @IsInt()
  mealtypes: number;

  @IsInt()
  menus: number;

  @IsInt()
  menuitems: number;

  @IsInt()
  pantry: number;

  @IsInt()
  photos: number;

  @IsInt()
  recipes: number;
}
