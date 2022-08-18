import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Matches,
  Max,
  Min,
} from 'class-validator';

const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
export class LoginUserDto {
  @ApiProperty({ example: 'John', description: 'user login' })
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @ApiProperty({ example: 'secret123', description: 'password' })
  @IsString()
  @IsNotEmpty()
  @Matches(passwordPattern, {
    message:
      'The password must consist of letters and numbers (least 1 number and 1 character)',
  })
  readonly password: string;
}
export class CreateUserDto extends LoginUserDto {
  @ApiProperty({ example: 23, description: 'user age' })
  @IsNumber()
  @Min(4)
  @Max(130)
  @IsNotEmpty()
  readonly age: number;
}
