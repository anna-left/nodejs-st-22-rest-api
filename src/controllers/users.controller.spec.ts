//https://nishabe.medium.com/unit-testing-a-nestjs-app-in-shortest-steps-bbe83da6408
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';

import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../data-access/users/create-user.dto';
import { SearchUserDto } from '../data-access/users/search-user.dto';
import * as mockData from '../utils/mockData';
import { HTTP_RESPONSE_MESSAGES } from '../utils/constants';

const mockDB = [];

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const UsersServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        createUser: jest.fn((createUserDto: CreateUserDto) => {
          const user = mockDB.find(
            (user) => user.login === createUserDto.login && !user.isDeleted,
          );
          if (user) {
            return HTTP_RESPONSE_MESSAGES.USER_EXISTS;
          }
          const newUser = mockData.getUserFromDto(createUserDto);
          mockDB.push(newUser);
          return newUser;
        }),
        findAll: jest.fn((searchUserDto: SearchUserDto) => {
          return mockDB
            .filter(
              (user) =>
                !user.isDeleted &&
                user.login
                  .toLowerCase()
                  .includes(searchUserDto.loginSubstring.toLowerCase()),
            )
            .sort(getFunctionCompare('login'))
            .slice(0, Number(searchUserDto.limit));
        }),
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, UsersServiceProvider],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
  });

  describe('create', () => {
    it('should create the first user', async () => {
      const res = (await usersController.create(
        mockData.firstMockCreateUserDto,
      )) as mockData.IUser;
      expect(res.login).toBe(mockData.firstMockUser.login);
    });
  });

  describe('create', () => {
    it('should create the second user', async () => {
      const res = (await usersController.create(
        mockData.secondMockCreateUserDto,
      )) as mockData.IUser;
      expect(res.password).toBe(mockData.secondMockUser.password);
    });
  });

  describe('create', () => {
    it('should return exception "User with this login already exists in the database"', async () => {
      const res = (await usersController.create(
        mockData.secondMockCreateUserDto,
      )) as mockData.IUser;
      expect(res).toBe(HTTP_RESPONSE_MESSAGES.USER_EXISTS);
    });
  });

  describe('findAll', () => {
    it('should return array of users', async () => {
      const res = await usersController.findAll({
        loginSubstring: 'Robert',
        limit: '2',
      });
      expect(Array.isArray(res)).toBe(true);
      expect(res.length).toBe(2);
    });
  });
});

function getFunctionCompare(key: string) {
  return (element1, element2) => {
    const lowerElement1 = element1[key].toLowerCase();
    const lowerElement2 = element2[key].toLowerCase();
    if (lowerElement1 < lowerElement2) {
      return -1;
    }
    if (lowerElement1 > lowerElement2) {
      return 1;
    }
    return 0;
  };
}
