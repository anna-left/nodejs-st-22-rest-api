import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroupsService } from '../services/groups.service';
import { CreateGroupDto } from '../data-access/create-group.dto';
import { Group } from '../models/groups.model';
import { HTTP_RESPONS_MESSAGES } from '../../utils/constants';

type Answer = string | Group | [Group] | undefined;

@ApiTags('Groups')
@Controller('v1/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiOperation({ summary: 'Group creation' })
  @ApiResponse({ status: 201, type: Group })
  @ApiBody({ type: CreateGroupDto })
  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    const answer: Answer = await this.groupsService.createGroup(createGroupDto);
    if (typeof answer === 'string') {
      throw new BadRequestException(answer);
    }
    return answer;
  }

  @ApiOperation({ summary: 'Get all groups' })
  @ApiResponse({ status: 200, type: [Group] })
  @Get()
  async findAll() {
    return await this.groupsService.findAll();
  }

  @ApiOperation({ summary: 'Get one group by id' })
  @ApiResponse({ status: 200, type: Group })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const answer = await this.groupsService.findOne(id);
    if (answer === HTTP_RESPONS_MESSAGES.USER_NOT_FOUND) {
      throw new NotFoundException(answer);
    } else if (typeof answer === 'string') {
      throw new BadRequestException(answer);
    }
    return answer;
  }

  @ApiOperation({ summary: 'Update group' })
  @ApiResponse({ status: 200, type: Group })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: CreateGroupDto,
  ) {
    const answer = await this.groupsService.update(id, updateGroupDto);
    if (answer === HTTP_RESPONS_MESSAGES.USER_NOT_FOUND) {
      throw new NotFoundException(answer);
    } else if (typeof answer === 'string') {
      throw new BadRequestException(answer);
    }
    return answer;
  }

  @ApiOperation({ summary: 'Remove group' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const answer = await this.groupsService.remove(id);
    if (answer === HTTP_RESPONS_MESSAGES.USER_NOT_FOUND) {
      throw new NotFoundException(answer);
    } else if (answer) {
      throw new BadRequestException(answer);
    }
  }
}
