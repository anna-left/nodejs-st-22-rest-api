import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly login: string;
  @IsString()
  readonly email: string;
  @IsString()
  readonly password: string;
  @IsNumber()
  readonly age: number;
  @IsBoolean()
  readonly isDeleted: boolean;
}
