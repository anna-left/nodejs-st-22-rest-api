import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users/services/users.service';
import { UsersController } from './users/controllers/users.controller';
import { User } from './users/models/users.model';
import { UsersRepository } from './users/data-access/users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [SequelizeModule.forFeature([User])],
})
export class UsersModule {}
