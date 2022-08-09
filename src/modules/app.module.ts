import { Module } from '@nestjs/common';
import 'dotenv/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from './users.module';
import { User } from '../models/users.model';
import { GroupsModule } from './groups.module';
import { Group } from '../models/groups.model';
import { UserGroups } from 'src/models/user-groups.model';
import { LoggerModule } from './logger.module';

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
  providers: [],
})
export class AppModule {}
