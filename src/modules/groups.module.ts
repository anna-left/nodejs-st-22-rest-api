import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GroupsService } from '../services/groups.service';
import { GroupsController } from '../controllers/groups.controller';
import { Group } from '../models/groups.model';
import { GroupsRepository } from '../data-access/groups/groups.repository';
import { User } from 'src/models/users.model';
import { UserGroups } from 'src/models/user-groups.model';
import { LoggerModule } from './logger.module';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, GroupsRepository],
  imports: [
    LoggerModule,
    SequelizeModule.forFeature([Group, User, UserGroups]),
  ],
})
export class GroupsModule {}
