import { IsNumber, IsString } from 'class-validator';

export class LoginSubstringUserDto {
  @IsString()
  readonly loginSubstring: string;
  @IsNumber()
  readonly limit: number;
}
