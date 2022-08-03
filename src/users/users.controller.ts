import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Put,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { User } from './users.model';
import { HTTP_RESPONS_MESSAGES } from './utils/constants';

interface IAnswer {
  message?: string;
  value?: User | [User];
}

@ApiTags('Users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  @ApiBody({ type: CreateUserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const answer: IAnswer = await this.usersService.createUser(createUserDto);
    if (answer.message) {
      throw new BadRequestException(answer.message);
    }
    return answer.value;
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async findAll(@Query() query: SearchUserDto) {
    return await this.usersService.findAll(query);
  }

  @ApiOperation({ summary: 'Get one user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const answer = await this.usersService.findOne(id);
    if (answer.message) {
      throw new NotFoundException(answer.message);
    }
    return answer.value;
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const answer = await this.usersService.update(id, updateUserDto);
    if (answer.message === HTTP_RESPONS_MESSAGES.USER_NOT_FOUND) {
      throw new NotFoundException(answer.message);
    } else if (answer.message === HTTP_RESPONS_MESSAGES.USER_EXISTS) {
      throw new BadRequestException(answer.message);
    }
    return answer.value;
  }

  @ApiOperation({ summary: 'Remove user' })
  @ApiResponse({ status: 200, type: User })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const answer = await this.usersService.remove(id);
    if (answer.message) {
      throw new NotFoundException(answer.message);
    }
    return answer.value;
  }
}
