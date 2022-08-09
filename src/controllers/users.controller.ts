import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../data-access/users/create-user.dto';
import { UpdateUserDto } from '../data-access/users/update-user.dto';
import { SearchUserDto } from '../data-access/users/search-user.dto';
import { User } from '../models/users.model';
import { handleResponse } from 'src/controllers/handle-response';
import { MyLogger } from 'src/services/logger.service';
import { Request } from 'express';

@ApiTags('Users')
@Controller('v1/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private myLogger: MyLogger,
  ) {
    this.myLogger.setContext(UsersController.name);
  }

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 201, type: User })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Req() request: Request) {
    const answer = await this.usersService.createUser(createUserDto);
    this.myLogger.customLog(request);
    return handleResponse(answer);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async findAll(@Query() query: SearchUserDto, @Req() request: Request) {
    this.myLogger.customLog(request);
    return await this.usersService.findAll(query);
  }

  @ApiOperation({ summary: 'Get one user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() request: Request) {
    const answer = await this.usersService.findOne(id);
    this.myLogger.customLog(request);
    return handleResponse(answer);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: Request,
  ) {
    const answer = await this.usersService.update(id, updateUserDto);
    this.myLogger.customLog(request);
    return handleResponse(answer);
  }

  @ApiOperation({ summary: 'Remove user' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: Request) {
    const answer = await this.usersService.remove(id);
    this.myLogger.customLog(request);
    return handleResponse(answer);
  }
}
