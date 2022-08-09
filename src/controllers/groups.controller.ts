import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroupsService } from '../services/groups.service';
import { CreateGroupDto } from '../data-access/groups/create-group.dto';
import { Group } from '../models/groups.model';
import { UpdateGroupDto } from '../data-access/groups/update-group.dto';
import { handleResponse } from 'src/controllers/handle-response';
import { AddUsersToGroupDto } from 'src/data-access/add-users-to-group.dto';
import { MyLogger } from 'src/services/logger.service';
// import { HttpExceptionFilter } from 'src/http-exception-filter ';

type Answer = string | Group | [Group] | undefined;

@ApiTags('Groups')
@Controller('v1/groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private myLogger: MyLogger, // private httpExceptionFilter: HttpExceptionFilter,
  ) {
    // const [req, res, next] = host.getArgs();
    this.myLogger.setContext(GroupsService.name);
  }

  @ApiOperation({ summary: 'Group creation' })
  @ApiResponse({ status: 201, type: Group })
  @ApiBody({ type: CreateGroupDto })
  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    const answer: Answer = await this.groupsService.createGroup(createGroupDto);
    return handleResponse(answer);
  }

  @ApiOperation({ summary: 'Get all groups' })
  @ApiResponse({ status: 200, type: [Group] })
  @Get()
  async findAll() {
    this.myLogger.controllerLog('findAll');
    return await this.groupsService.findAll();
  }

  @ApiOperation({ summary: 'Get one group by id' })
  @ApiResponse({ status: 200, type: Group })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const answer = await this.groupsService.findOne(id);
    return handleResponse(answer);
  }

  @ApiOperation({ summary: 'Update group' })
  @ApiResponse({ status: 200, type: Group })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    const answer = await this.groupsService.update(id, updateGroupDto);
    return handleResponse(answer);
  }

  @ApiOperation({ summary: 'Remove group' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const answer = await this.groupsService.remove(id);
    return handleResponse(answer);
  }

  @ApiOperation({ summary: 'Add users to group' })
  @ApiResponse({ status: 200, type: Group })
  @Post(':id')
  async addUsersToGroup(
    @Param('id') id: string,
    @Body() addUsersToGroupDto: AddUsersToGroupDto,
  ) {
    const answer = await this.groupsService.addUsersToGroup(
      id,
      addUsersToGroupDto,
    );
    return handleResponse(answer);
  }
}
