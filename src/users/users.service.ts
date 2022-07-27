import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const user = await this.findByLogin(createUserDto.login);
    if (user) {
      throw new BadRequestException(
        `User ${createUserDto.login} already exists in the database`,
      );
    }
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
    const user = await this.userRepository.findOne({
      where: {
        isDeleted: false,
        id: Number(id),
      },
    });
    if (!user) {
      throw new NotFoundException("User does'n exist");
    }
    return user;
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("User does'n exist");
    }
    if (
      updateUserDto.hasOwnProperty('login') &&
      updateUserDto.login !== user.login
    ) {
      if (await this.findByLogin(updateUserDto.login)) {
        throw new BadRequestException(
          `User ${updateUserDto.login} already exists in the database`,
        );
      }
    }
    return await user.update(updateUserDto);
  }

  async findByLogin(login: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        isDeleted: false,
        login,
      },
    });
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("User does'n exist");
    }
    return await user.update({ isDeleted: true });
  }
}
