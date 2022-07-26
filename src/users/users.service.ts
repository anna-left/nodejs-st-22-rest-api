import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Op } from 'sequelize';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  async findAll(params: SearchUserDto) {
    const substring =
      params.loginSubstring === undefined ? '' : params.loginSubstring;
    const limit = Number(params.limit);
    const arrUsers = await this.userRepository.findAll({
      where: {
        isDeleted: false,
        login: {
          [Op.like]: `%${substring}%`,
        },
      },
      order: ['login'],
    });
    if (!limit) {
      return arrUsers;
    }
    return arrUsers.slice(0, limit);
  }

  @ApiOperation({ summary: 'Get one user by id' })
  @ApiResponse({ status: 200, type: [User] })
  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: Number(id),
      },
    });
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  async update(user: User, updateUserDto: UpdateUserDto) {
    return await user.update(updateUserDto);
  }

  async findByLogin(login: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        login,
      },
    });
  }

  async remove(user: User) {
    return await user.update({ isDeleted: true });
  }
}
