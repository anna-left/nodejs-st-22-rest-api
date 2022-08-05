import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GroupsService } from './services/groups.service';
import { GroupsController } from './controllers/groups.controller';
import { Group } from './models/groups.model';
import { GroupsRepository } from './data-access/groups.repository';
import { User } from 'src/users/models/users.model';
// import { UserGroup } from 'src/user-group/models/users-groups.model';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, GroupsRepository],
  imports: [SequelizeModule.forFeature([Group, User])],
  // imports: [SequelizeModule.forFeature([Group, User, UserGroup])],
})
export class GroupsModule {}
