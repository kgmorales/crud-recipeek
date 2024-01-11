import { IsString } from 'class-validator';

export class PaprikaTokenDto {
  @IsString()
  token: string;

  @IsString()
  id: string;
}
