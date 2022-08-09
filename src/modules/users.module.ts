import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { User } from '../models/users.model';
import { UsersRepository } from '../data-access/users/users.repository';
import { Group } from 'src/models/groups.model';
import { UserGroups } from 'src/models/user-groups.model';
import { LoggerModule } from './logger.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [
    LoggerModule,
    SequelizeModule.forFeature([User, Group, UserGroups]),
  ],
})
export class UsersModule {}
