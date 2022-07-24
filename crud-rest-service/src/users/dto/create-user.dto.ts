import {
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  Matches,
  Max,
  Min,
} from 'class-validator';

const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(passwordPattern, {
    message:
      'The password must consist of letters and numbers (least 1 number and 1 character)',
  })
  readonly password: string;

  @IsNumber()
  @Min(4)
  @Max(130)
  @IsNotEmpty()
  readonly age: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly isDeleted: boolean;
}
