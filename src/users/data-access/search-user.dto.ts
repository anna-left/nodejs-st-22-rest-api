import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchUserDto {
  @ApiProperty({
    example: 'John',
    description: 'substring for selecting users by login',
  })
  @IsString()
  @IsOptional()
  loginSubstring: string;

  @ApiProperty({
    example: '5',
    description: 'number of users in the selection',
  })
  @IsString()
  @IsOptional()
  limit: string;
}
