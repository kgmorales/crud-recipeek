import { IsNumber, IsString } from 'class-validator';

export class SuccessMessageDto {
  @IsNumber()
  id: number;

  @IsString()
  message: string;
}
