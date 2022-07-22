import Joi from 'joi';

import { IsString, IsNumber, IsBoolean, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly login: string;

  @IsString()
  readonly email: string;

  @IsString()
  @Matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, {
    message:
      'Password must contain at least 1 number and 1 character in a string',
  })
  readonly password: string;

  @IsNumber()
  readonly age: number;

  @IsBoolean()
  readonly isDeleted: boolean;
}

export const UserSchema = Joi.object({
  login: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().integer().min(4).max(130).required(),
  isDeleted: Joi.boolean().required(),
}).options({
  abortEarly: false,
});
