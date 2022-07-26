import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Res,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const existUser = await this.usersService.findByLogin(createUserDto.login);
    if (existUser) {
      throw new BadRequestException(
        `User ${createUserDto.login} already exists in the database`,
      );
    }
    return await this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  findAll(@Query() query: { loginSubstring: string; limit: number }) {
    return this.usersService.findAll(query);
  }

  @ApiOperation({ summary: 'Get one user by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException("User does'n exist");
    }
    return response.status(HttpStatus.OK).send(user);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response,
  ) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      return response.status(HttpStatus.NOT_FOUND).send('Not Found');
    }
    if (
      updateUserDto.hasOwnProperty('login') &&
      updateUserDto.login !== user.login
    ) {
      const existUser = await this.usersService.findByLogin(
        updateUserDto.login,
      );
      if (existUser) {
        throw new BadRequestException(
          `User ${updateUserDto.login} already exists in the database`,
        );
      }
    }

    const updUser = await this.usersService.update(user, updateUserDto);
    return response.status(HttpStatus.OK).send(updUser);
  }

  @ApiOperation({ summary: 'Remove user' })
  @ApiResponse({ status: 200, type: User })
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException("User does'n exist");
    }
    await this.usersService.remove(user);
    if (user.isDeleted) {
      return response
        .status(HttpStatus.OK)
        .send('The object was successfully deleted');
    }
    throw new BadRequestException('Unsuccessful deletion attempt');
  }
}
