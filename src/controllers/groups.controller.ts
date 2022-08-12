import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { GroupsService } from '../services/groups.service';
import { CreateGroupDto } from '../data-access/groups/create-group.dto';
import { Group } from '../models/groups.model';
import { UpdateGroupDto } from '../data-access/groups/update-group.dto';
import { handleResponse } from 'src/controllers/handle-response';
import { AddUsersToGroupDto } from 'src/data-access/add-users-to-group.dto';
import { MyLogger } from 'src/loggers/logger';

@ApiTags('Groups')
@Controller('v1/groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private myLogger: MyLogger,
  ) {
    this.myLogger.setContext(GroupsController.name);
  }

  @ApiOperation({ summary: 'Group creation' })
  @ApiResponse({ status: 201, type: Group })
  @ApiBody({ type: CreateGroupDto })
  @Post()
  async create(
    @Body() createGroupDto: CreateGroupDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return handleResponse(
      await this.groupsService.createGroup(createGroupDto),
      request,
      response,
      this.myLogger,
    );
  }

  @ApiOperation({ summary: 'Get all groups' })
  @ApiResponse({ status: 200, type: [Group] })
  @Get()
  async findAll(@Req() request: Request, @Res() response: Response) {
    return handleResponse(
      await this.groupsService.findAll(),
      request,
      response,
      this.myLogger,
    );
  }

  @ApiOperation({ summary: 'Get one group by id' })
  @ApiResponse({ status: 200, type: Group })
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return handleResponse(
      await this.groupsService.findOne(id),
      request,
      response,
      this.myLogger,
    );
  }

  @ApiOperation({ summary: 'Update group' })
  @ApiResponse({ status: 200, type: Group })
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateGroupDto: UpdateGroupDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return handleResponse(
      await this.groupsService.update(id, updateGroupDto),
      request,
      response,
      this.myLogger,
    );
  }

  @ApiOperation({ summary: 'Remove group' })
  @ApiResponse({ status: 204 })
  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return handleResponse(
      await this.groupsService.remove(id),
      request,
      response,
      this.myLogger,
    );
  }

  @ApiOperation({ summary: 'Add users to group' })
  @ApiResponse({ status: 200, type: Group })
  @Post(':id')
  async addUsersToGroup(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() addUsersToGroupDto: AddUsersToGroupDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return handleResponse(
      await this.groupsService.addUsersToGroup(id, addUsersToGroupDto),
      request,
      response,
      this.myLogger,
    );
  }
}
