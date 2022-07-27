import { IsOptional, IsString } from 'class-validator';

export class SearchUserDto {
  @IsString()
  @IsOptional()
  loginSubstring: string;

  @IsString()
  @IsOptional()
  limit: string;
}
