import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class SearchUserDto {
  @IsString()
  @IsOptional()
  loginSubstring: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  limit: number;
}
