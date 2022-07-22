import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { LoginSubstringUserDto } from './dto/getLoginSubstring-user.dto';
import { CreateUserValidatorPipe } from './validation.pipe';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(new CreateUserValidatorPipe()) createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get('/limitusers')
  getAutoSuggestUsers(
    @Body() loginSubstringUserDto: LoginSubstringUserDto,
    @Res() response,
  ) {
    const users = this.usersService.getAutoSuggestUsers(loginSubstringUserDto);
    if (!UsersController) {
      return response.status(HttpStatus.NOT_FOUND).send('Not Found');
    }
    return response.status(HttpStatus.OK).send(users);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() response) {
    const user = this.usersService.findOne(id);
    if (!user) {
      return response.status(HttpStatus.NOT_FOUND).send('Not Found');
    }
    return response.status(HttpStatus.OK).send(user);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.usersService.findAll(limit, offset);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response,
  ) {
    const user = this.usersService.findOne(id);
    if (!user) {
      return response.status(HttpStatus.NOT_FOUND).send('Not Found');
    }
    const updUser = this.usersService.update(id, updateUserDto);
    return response.status(HttpStatus.OK).send(updUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() response) {
    const user = this.usersService.findOne(id);
    if (!user) {
      return response.status(HttpStatus.NOT_FOUND).send('Not Found');
    }
    this.usersService.remove(id);
    if (user.isDeleted) {
      return response
        .status(HttpStatus.OK)
        .send('The object was successfully deleted');
    }
    return response.status(HttpStatus.NOT_FOUND).send('Not Found');
  }
}
