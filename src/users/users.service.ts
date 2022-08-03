import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { User } from './users.model';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  async createUser(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findByLogin(createUserDto.login);
    if (user) {
      throw new BadRequestException(
        `User ${createUserDto.login} already exists in the database`,
      );
    }
    return await this.usersRepository.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  async findAll(params: SearchUserDto) {
    const substring =
      params.loginSubstring === undefined ? '' : params.loginSubstring;
    return await this.usersRepository.findAll(substring, Number(params.limit));
  }

  @ApiOperation({ summary: 'Get one user by id' })
  @ApiResponse({ status: 200, type: [User] })
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException("User does'n exist");
    }
    return user;
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException("User does'n exist");
    }
    if (
      updateUserDto.hasOwnProperty('login') &&
      updateUserDto['login'] !== user.login
    ) {
      if (await this.usersRepository.findByLogin(updateUserDto['login'])) {
        throw new BadRequestException(
          `User ${updateUserDto['login']} already exists in the database`,
        );
      }
    }
    return await user.update(updateUserDto);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  async remove(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException("User does'n exist");
    }
    return await user.update({ isDeleted: true });
  }
}
