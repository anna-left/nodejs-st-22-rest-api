import { Injectable } from '@nestjs/common';

import { CreateUserDto } from '../data-access/users/create-user.dto';
import { UpdateUserDto } from '../data-access/users/update-user.dto';
import { SearchUserDto } from '../data-access/users/search-user.dto';
import { UsersRepository } from '../data-access/users/users.repository';
import { HTTP_RESPONS_MESSAGES } from '../utils/constants';
import { uuidValidate } from 'src/utils/uuidValidate';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findByLogin(createUserDto.login);
    if (user) {
      if (user.isDeleted) {
        return HTTP_RESPONS_MESSAGES.USER_EXISTS_DELETED;
      }
      return HTTP_RESPONS_MESSAGES.USER_EXISTS;
    }
    return await this.usersRepository.create(createUserDto);
  }

  async findAll(params: SearchUserDto) {
    const substring =
      params.loginSubstring === undefined ? '' : params.loginSubstring;
    return await this.usersRepository.findAll(substring, Number(params.limit));
  }

  async findOne(id: string) {
    if (!uuidValidate(id)) {
      return HTTP_RESPONS_MESSAGES.INVALID_UUID_FORMAT;
    }
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      return HTTP_RESPONS_MESSAGES.USER_NOT_FOUND;
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!uuidValidate(id)) {
      return HTTP_RESPONS_MESSAGES.INVALID_UUID_FORMAT;
    }
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      return HTTP_RESPONS_MESSAGES.USER_NOT_FOUND;
    }
    if (
      updateUserDto.hasOwnProperty('login') &&
      updateUserDto['login'] !== user.login
    ) {
      const user = await this.usersRepository.findByLogin(
        updateUserDto['login'],
      );
      if (user) {
        if (user.isDeleted) {
          return HTTP_RESPONS_MESSAGES.USER_EXISTS_DELETED;
        }
        return HTTP_RESPONS_MESSAGES.USER_EXISTS;
      }
    }
    return await user.update(updateUserDto);
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      return HTTP_RESPONS_MESSAGES.INVALID_UUID_FORMAT;
    }
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      return HTTP_RESPONS_MESSAGES.USER_NOT_FOUND;
    }
    await user.update({ isDeleted: true });
  }
}
