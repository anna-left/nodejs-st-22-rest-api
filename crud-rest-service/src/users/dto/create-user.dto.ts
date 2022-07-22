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

const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

export const UserSchema = Joi.object({
  login: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .pattern(new RegExp(passwordPattern))
    .messages({
      'string.pattern.base':
        'Password must consist of letters and numbers (and contain at least 1 number and 1 character in a string)',
    }),
  age: Joi.number().integer().min(4).max(130).required(),
  isDeleted: Joi.boolean().required(),
}).options({
  abortEarly: false,
});
