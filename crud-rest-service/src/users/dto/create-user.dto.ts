import Joi from 'joi';

import { IsString, IsNumber, IsBoolean } from 'class-validator';

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

export const UserSchema = Joi.object({
  login: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().integer().min(4).max(130).required(),
  isDeleted: Joi.boolean().required(),
}).options({
  abortEarly: false,
});
