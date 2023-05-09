import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PaprikaTokenDto {
  @ApiProperty()
  @IsString()
  token: string;
}
