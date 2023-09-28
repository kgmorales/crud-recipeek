import { ApiProperty } from '@nestjs/swagger';
import { Category, Recipe } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';

export class HomeDto {
  @ApiProperty()
  @IsArray()
  categories: Category[];

  @ApiProperty()
  @IsString()
  favorites: Recipe[];

  @ApiProperty()
  @IsString()
  recents: Recipe[];
}
