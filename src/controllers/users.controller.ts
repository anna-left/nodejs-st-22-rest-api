import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Put,
  ParseUUIDPipe,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../data-access/users/create-user.dto';
import { UpdateUserDto } from '../data-access/users/update-user.dto';
import { SearchUserDto } from '../data-access/users/search-user.dto';
import { User } from '../models/users.model';
import { handleResponse } from 'src/controllers/handle-response';
import { MyLogger } from 'src/loggers/logger';

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
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return handleResponse(
      await this.usersService.createUser(createUserDto),
      request,
      response,
      this.myLogger,
    );
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async findAll(
    @Query() query: SearchUserDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return handleResponse(
      await this.usersService.findAll(query),
      request,
      response,
      this.myLogger,
    );
  }

  @ApiOperation({ summary: 'Get one user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    this.myLogger.customLog(request, response);
    return handleResponse(
      await this.usersService.findOne(id),
      request,
      response,
      this.myLogger,
    );
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return handleResponse(
      await this.usersService.update(id, updateUserDto),
      request,
      response,
      this.myLogger,
    );
  }

  @ApiOperation({ summary: 'Remove user' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return handleResponse(
      await this.usersService.remove(id),
      request,
      response,
      this.myLogger,
    );
  }
}
