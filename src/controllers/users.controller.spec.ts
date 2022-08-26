//https://nishabe.medium.com/unit-testing-a-nestjs-app-in-shortest-steps-bbe83da6408
import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../data-access/users/create-user.dto';
import { SearchUserDto } from '../data-access/users/search-user.dto';
import * as mockData from '../utils/mockData';
import { HTTP_RESPONSE_MESSAGES } from '../utils/constants';
import { UpdateUserDto } from '../data-access/users/update-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const UsersServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        createUser: jest.fn((createUserDto: CreateUserDto) => {
          const user = mockData.mockUsersArr.find(
            (user) => user.login === createUserDto.login && !user.isDeleted,
          );
          if (user) {
            return HTTP_RESPONSE_MESSAGES.USER_EXISTS;
          }
          const newUser = mockData.getUserFromDto(createUserDto);
          mockData.mockUsersArr.push(newUser);
          return newUser;
        }),
        findAll: jest.fn((searchUserDto: SearchUserDto) => {
          return mockData.mockUsersArr
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
        findOne(id: string) {
          const user = mockData.mockUsersArr.find(
            (user) => user.id === id && !user.isDeleted,
          );
          if (!user) {
            return HTTP_RESPONSE_MESSAGES.USER_NOT_FOUND;
          }
          return user;
        },
        update(id: string, updateUserDto: UpdateUserDto) {
          const user = mockData.mockUsersArr.find(
            (user) => user.id === id && !user.isDeleted,
          );
          if (!user) {
            return HTTP_RESPONSE_MESSAGES.USER_NOT_FOUND;
          }
          if (
            updateUserDto.hasOwnProperty('login') &&
            updateUserDto['login'] !== user.login
          ) {
            const user = mockData.mockUsersArr.find(
              (user) =>
                user.login === updateUserDto['login'] && !user.isDeleted,
            );
            if (user) {
              return HTTP_RESPONSE_MESSAGES.USER_EXISTS;
            }
          }
          const updateUser = {
            ...user,
            login: updateUserDto.login || user.login,
            age: updateUserDto.age || user.age,
            password: updateUserDto.password || user.password,
          };
          const foundIndex = mockData.mockUsersArr.findIndex(
            (item) => item.id == id,
          );
          mockData.mockUsersArr[foundIndex] = updateUser;
          return updateUser;
        },
        remove(id: string) {
          const user = mockData.mockUsersArr.find(
            (user) => user.id === id && !user.isDeleted,
          );
          if (!user) {
            return HTTP_RESPONSE_MESSAGES.USER_NOT_FOUND;
          }
          user.isDeleted = true;
        },
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, UsersServiceProvider],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const res = (await usersController.create(
        mockData.firstMockCreateUserDto,
      )) as mockData.IUser;
      expect(res.login).toBe(mockData.firstMockUser.login);
    });
  });

  describe('create', () => {
    it('should create another user', async () => {
      const res = (await usersController.create(
        mockData.secondMockCreateUserDto,
      )) as mockData.IUser;
      expect(res.password).toBe(mockData.secondMockUser.password);
    });
  });

  describe('create', () => {
    it(`should return exception - ${HTTP_RESPONSE_MESSAGES.USER_EXISTS}`, async () => {
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

  describe('findAll', () => {
    it('should return empty array', async () => {
      const res = await usersController.findAll({
        loginSubstring: 'Tom',
        limit: '2',
      });
      expect(Array.isArray(res)).toBe(true);
      expect(res.length).toBe(0);
    });
  });

  describe('findOne', () => {
    it('should find user by id', async () => {
      const res = await usersController.findOne(mockData.mockUsersArr[0].id);
      expect(typeof res).toBe('object');
      if (typeof res === 'object') {
        expect(res['id']).toBe(mockData.mockUsersArr[0].id);
      }
    });
  });

  describe('findOne', () => {
    it(`should return exception - ${HTTP_RESPONSE_MESSAGES.USER_NOT_FOUND}`, async () => {
      const res = await usersController.findOne(mockData.RandomID);
      expect(res).toBe(HTTP_RESPONSE_MESSAGES.USER_NOT_FOUND);
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      const res = await usersController.update(mockData.mockUsersArr[0].id, {
        password: 'myNewPassword',
      });
      expect(typeof res).toBe('object');
      if (typeof res === 'object') {
        expect(res['password']).toBe('myNewPassword');
      }
    });
  });

  describe('update', () => {
    it(`should return exception ${HTTP_RESPONSE_MESSAGES.USER_NOT_FOUND}`, async () => {
      const res = await usersController.update(mockData.RandomID, {
        password: 'myNewPassword',
      });
      expect(res).toBe(HTTP_RESPONSE_MESSAGES.USER_NOT_FOUND);
    });
  });

  describe('remove', () => {
    it('should remove user', async () => {
      const id = mockData.mockUsersArr[0].id;
      await usersController.remove(id);
      const res = await usersController.findOne(id);
      expect(res).toBe(HTTP_RESPONSE_MESSAGES.USER_NOT_FOUND);
    });
  });

  describe('remove', () => {
    it(`should return exception ${HTTP_RESPONSE_MESSAGES.USER_NOT_FOUND}`, async () => {
      const res = await usersController.remove(mockData.RandomID);
      expect(res).toBe(HTTP_RESPONSE_MESSAGES.USER_NOT_FOUND);
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
