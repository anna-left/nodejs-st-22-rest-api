import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

import { Group } from '../../models/groups.model';
import { CreateGroupDto } from './create-group.dto';
import { User } from 'src/models/users.model';
import { Transaction } from 'sequelize';

@Injectable()
export class GroupsRepository {
  constructor(
    @InjectModel(Group) private groupModel: typeof Group,
    private sequelize: Sequelize,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    try {
      return await this.groupModel.create(createGroupDto);
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    return this.groupModel.findAll({
      include: [
        {
          model: User,
          required: false,
          where: { isDeleted: false },
          through: { attributes: [] },
        },
      ],
    });
  }

  async findOne(id: string, t: Transaction | null = null): Promise<Group> {
    return this.groupModel.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          required: false,
          where: { isDeleted: false },
          through: { attributes: [] },
        },
      ],
      transaction: t,
    });
  }

  async findByName(name: string): Promise<Group> {
    return await this.groupModel.findOne({
      where: {
        name,
      },
    });
  }

  async addUsersToGroup(id: string, userIds: string[]) {
    return await this.sequelize.transaction(async (t) => {
      const group = await this.findOne(id, t);
      if (!group) {
        return group;
      }
      const groupUsers = await Promise.all(
        userIds.map(async (id) => {
          const user = await this.userModel.findOne({
            where: { id, isDeleted: false },
            rejectOnEmpty: true,
            transaction: t,
          });
          return user;
        }),
      );
      await group.$add('users', groupUsers, { transaction: t });
      return await this.findOne(id, t);
    }); //end transaction
  }
}
