import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  CreateUserDto,
  LoginUserDto,
} from 'src/data-access/users/create-user.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/models/users.model';
import { HTTP_RESPONSE_MESSAGES } from 'src/utils/constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    if (typeof user === 'string') {
      return user;
    }
    return {
      id: user.id,
      login: user.login,
      token: await this.generateToken(user),
    };
  }

  async registration(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 5);
    const user = await this.usersService.createUser({
      ...createUserDto,
      password: hashPassword,
    });
    if (typeof user === 'string') {
      return user;
    }
    return {
      id: user.id,
      login: user.login,
      token: await this.generateToken(user),
    };
  }

  private async generateToken(user: User) {
    const payLoad = { login: user.login, id: user.id, groups: user.groups };
    return this.jwtService.sign(payLoad);
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService.findByLogin(userDto.login);
    const passwordIsCorrect = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordIsCorrect) {
      return user;
    }
    return HTTP_RESPONSE_MESSAGES.WRONG_LOGIN_PASSWORD;
  }
}
