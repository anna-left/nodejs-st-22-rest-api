import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { User } from './models/users.model';
import { UsersRepository } from './data-access/users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [SequelizeModule.forFeature([User])],
})
export class UsersModule {}
