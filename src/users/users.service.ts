import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UsersRepository } from './users.repository';
import { HTTP_RESPONS_MESSAGES } from './utils/constants';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findByLogin(createUserDto.login);
    if (user) {
      return {
        message: HTTP_RESPONS_MESSAGES.USER_EXISTS,
      };
    }
    return { value: await this.usersRepository.create(createUserDto) };
  }

  async findAll(params: SearchUserDto) {
    const substring =
      params.loginSubstring === undefined ? '' : params.loginSubstring;
    return await this.usersRepository.findAll(substring, Number(params.limit));
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      return {
        message: HTTP_RESPONS_MESSAGES.USER_NOT_FOUND,
      };
    }
    return { value: user };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      return {
        message: HTTP_RESPONS_MESSAGES.USER_NOT_FOUND,
      };
    }
    if (
      updateUserDto.hasOwnProperty('login') &&
      updateUserDto['login'] !== user.login
    ) {
      if (await this.usersRepository.findByLogin(updateUserDto['login'])) {
        return {
          message: HTTP_RESPONS_MESSAGES.USER_EXISTS,
        };
      }
    }
    return { value: await user.update(updateUserDto) };
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      return {
        message: HTTP_RESPONS_MESSAGES.USER_NOT_FOUND,
      };
    }
    return { value: await user.update({ isDeleted: true }) };
  }
}
