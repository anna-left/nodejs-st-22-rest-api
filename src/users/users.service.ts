import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { LoginSubstringUserDto } from './dto/getLoginSubstring-user.dto';
// import { getFunctionCompare } from './utils/sort';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}
  // private users: User[] = [];

  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }
  // create(createUserDto: CreateUserDto) {
  //   this.users.push({
  //     ...createUserDto,
  //     id: uuidv4(),
  //   });
  //   return this.users.at(-1);
  // }

  // findAll(limit = 0, offset = 0) {
  //   const arrUsers = this.users.filter((user) => !user.isDeleted);
  //   if (!limit) {
  //     return arrUsers;
  //   }
  //   return arrUsers.slice((offset - 1) * limit, offset * limit);
  // }

  // findOne(id: string) {
  //   return this.users.find((user) => user.id === id && !user.isDeleted);
  // }

  // findByLogin(login: string) {
  //   return this.users.find((user) => user.login === login && !user.isDeleted);
  // }

  // getAutoSuggestUsers(loginSubstringUserDto: LoginSubstringUserDto) {
  //   return this.users
  //     .filter(
  //       (user) =>
  //         !user.isDeleted &&
  //         user.login
  //           .toLowerCase()
  //           .includes(loginSubstringUserDto.loginSubstring.toLowerCase()),
  //     )
  //     .sort(getFunctionCompare('login'))
  //     .slice(0, loginSubstringUserDto.limit);
  // }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   const i = this.users.findIndex((user) => user.id === id && !user.isDeleted);
  //   if (i === -1) return null;
  //   this.users[i] = {
  //     ...this.users[i],
  //     ...updateUserDto,
  //   };
  //   return this.users[i];
  // }

  // remove(id: string) {
  //   const i = this.users.findIndex((user) => user.id === id && !user.isDeleted);
  //   if (i === -1) return null;
  //   this.users[i].isDeleted = true;
  //   return this.users[i];
  // }
}
