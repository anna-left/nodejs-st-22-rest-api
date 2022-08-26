import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateUserDto,
  LoginUserDto,
} from '../data-access/users/create-user.dto';
import { User } from '../models/users.model';
import { AuthService } from '../services/auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, type: User })
  @ApiBody({ type: CreateUserDto })
  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @ApiOperation({ summary: 'Log in' })
  @ApiResponse({ status: 200, type: User })
  @ApiBody({ type: LoginUserDto })
  @Post('/login')
  async login(@Body() userDto: LoginUserDto) {
    return await this.authService.login(userDto);
  }
}
