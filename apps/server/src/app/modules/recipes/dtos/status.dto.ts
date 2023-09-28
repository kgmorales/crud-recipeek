import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class StatusDto {
  @ApiProperty()
  @IsInt()
  bookmarks: number;

  @ApiProperty()
  @IsInt()
  categories: number;

  @ApiProperty()
  @IsInt()
  groceries: number;

  @ApiProperty()
  @IsInt()
  groceryaisles: number;

  @ApiProperty()
  @IsInt()
  groceryingredients: number;

  @ApiProperty()
  @IsInt()
  grocerylists: number;

  @ApiProperty()
  @IsInt()
  meals: number;

  @ApiProperty()
  @IsInt()
  mealtypes: number;

  @ApiProperty()
  @IsInt()
  menus: number;

  @ApiProperty()
  @IsInt()
  menuitems: number;

  @ApiProperty()
  @IsInt()
  pantry: number;

  @ApiProperty()
  @IsInt()
  photos: number;

  @ApiProperty()
  @IsInt()
  recipes: number;
}
