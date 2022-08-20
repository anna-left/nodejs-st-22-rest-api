import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { GroupsService } from '../services/groups.service';
import { GroupsController } from '../controllers/groups.controller';
import { Group } from '../models/groups.model';
import { GroupsRepository } from '../data-access/groups/groups.repository';
import { User } from '../models/users.model';
import { UserGroups } from '../models/user-groups.model';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, GroupsRepository],
  imports: [SequelizeModule.forFeature([Group, User, UserGroups])],
})
export class GroupsModule {}
