import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { User } from '../models/users.model';
import { UsersRepository } from '../data-access/users/users.repository';
import { Group } from 'src/models/groups.model';
import { UserGroups } from 'src/models/user-groups.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [SequelizeModule.forFeature([User, Group, UserGroups])],
  exports: [UsersService],
})
export class UsersModule {}
