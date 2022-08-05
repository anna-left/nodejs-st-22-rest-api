import { Injectable } from '@nestjs/common';

import { CreateGroupDto } from '../data-access/create-group.dto';
import { UpdateGroupDto } from '../data-access/update-group.dto';
import { GroupsRepository } from '../data-access/groups.repository';
import { HTTP_RESPONS_MESSAGES } from '../../utils/constants';
import { uuidValidate } from 'src/utils/uuidValidate';

@Injectable()
export class GroupsService {
  constructor(private groupsRepository: GroupsRepository) {}

  async createGroup(createGroupDto: CreateGroupDto) {
    const group = await this.groupsRepository.findByName(createGroupDto.name);
    if (group) {
      return HTTP_RESPONS_MESSAGES.GROUP_EXISTS;
    }
    return await this.groupsRepository.create(createGroupDto);
  }

  async findAll() {
    return await this.groupsRepository.findAll();
  }

  async findOne(id: string) {
    if (!uuidValidate(id)) {
      return HTTP_RESPONS_MESSAGES.INVALID_UUID_FORMAT;
    }
    const group = await this.groupsRepository.findOne(id);
    if (!group) {
      return HTTP_RESPONS_MESSAGES.GROUP_NOT_FOUND;
    }
    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    if (!uuidValidate(id)) {
      HTTP_RESPONS_MESSAGES.INVALID_UUID_FORMAT;
    }
    const group = await this.groupsRepository.findOne(id);
    if (!group) {
      return HTTP_RESPONS_MESSAGES.GROUP_NOT_FOUND;
    }

    if (
      updateGroupDto.hasOwnProperty('name') &&
      updateGroupDto['name'] !== group.name
    ) {
      const group = await this.groupsRepository.findByName(
        updateGroupDto['name'],
      );
      if (group) {
        return HTTP_RESPONS_MESSAGES.GROUP_EXISTS;
      }
    }
    try {
      return await group.update(updateGroupDto);
    } catch (error) {
      return error.message;
    }
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      HTTP_RESPONS_MESSAGES.INVALID_UUID_FORMAT;
    }
    const group = await this.groupsRepository.findOne(id);
    if (!group) {
      return HTTP_RESPONS_MESSAGES.GROUP_NOT_FOUND;
    }
    await group.destroy();
  }
}
