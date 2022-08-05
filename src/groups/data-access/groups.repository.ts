import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Group } from '../models/groups.model';
import { CreateGroupDto } from './create-group.dto';

@Injectable()
export class GroupsRepository {
  constructor(@InjectModel(Group) private groupModel: typeof Group) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return await this.groupModel.create(createGroupDto);
  }

  async findAll() {
    return this.groupModel.findAll();
  }

  async findOne(id: string): Promise<Group> {
    return this.groupModel.findOne({
      where: {
        id,
      },
    });
  }
}
