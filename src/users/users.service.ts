import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Op } from 'sequelize';

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
  async findAll(params: { loginSubstring: string; limit: number }) {
    const arrUsers = await this.userRepository.findAll({
      where: {
        isDeleted: false,
        login: {
          [Op.like]: `%${params.loginSubstring}%`,
        },
      },
      order: ['login'],
    });
    return arrUsers.slice(0, params.limit);
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
