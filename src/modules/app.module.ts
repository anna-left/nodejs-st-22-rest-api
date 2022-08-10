import { Module } from '@nestjs/common';
import 'dotenv/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { APP_FILTER } from '@nestjs/core';

import { UsersModule } from './users.module';
import { User } from '../models/users.model';
import { GroupsModule } from './groups.module';
import { Group } from '../models/groups.model';
import { UserGroups } from 'src/models/user-groups.model';
import { LoggerModule } from './logger.module';
import { ExceptionsFilter } from 'src/services/exceptions-filter';

@Module({
  imports: [
    UsersModule,
    GroupsModule,
    LoggerModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [User, Group, UserGroups],
      autoLoadModels: true,
      define: {
        timestamps: false,
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsFilter,
    },
  ],
})
export class AppModule {}
