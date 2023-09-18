import { ApiProperty } from '@nestjs/swagger';
import { Recipe } from '@prisma/client';
import { IsArray, IsString } from 'class-validator';

export class HomeDto {
  @ApiProperty()
  @IsArray()
  categoryNames: string[];

  @ApiProperty()
  @IsString()
  favorites: Recipe[];

  @ApiProperty()
  @IsString()
  recent: Recipe[];
}
