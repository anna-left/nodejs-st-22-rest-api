import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findAll(substring: string, limit: number) {
    return this.userModel.findAll({
      where: {
        isDeleted: false,
        login: {
          [Op.iLike]: `%${substring}%`,
        },
      },
      limit: !limit ? null : limit,
      order: ['login'],
    });
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  async findByLogin(login: string): Promise<User> {
    return await this.userModel.findOne({
      where: {
        isDeleted: false,
        login,
      },
    });
  }
}
