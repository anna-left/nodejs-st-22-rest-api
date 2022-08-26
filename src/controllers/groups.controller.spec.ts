import { Test, TestingModule } from '@nestjs/testing';
import { GroupsService } from '../services/groups.service';
import { HTTP_RESPONSE_MESSAGES } from '../utils/constants';
import { GroupsController } from './groups.controller';
import * as mockData from '../utils/mockData';
import { CreateGroupDto } from '../data-access/groups/create-group.dto';
import { UpdateGroupDto } from '../data-access/groups/update-group.dto';

describe('GroupsController', () => {
  let groupsController: GroupsController;

  beforeEach(async () => {
    const GroupsServiceProvider = {
      provide: GroupsService,
      useFactory: () => ({
        createGroup: jest.fn((createGroupDto: CreateGroupDto) => {
          const group = mockData.mockGroupsArr.find(
            (group) => group.name === createGroupDto.name,
          );
          if (group) {
            return HTTP_RESPONSE_MESSAGES.GROUP_EXISTS;
          }
          const newGroup = mockData.getGroupFromDto(createGroupDto);
          mockData.mockGroupsArr.push(newGroup);
          return newGroup;
        }),
        findAll: jest.fn(() => {
          return mockData.mockGroupsArr;
        }),
        findOne(id: string) {
          const group = mockData.mockGroupsArr.find((group) => group.id === id);
          if (!group) {
            return HTTP_RESPONSE_MESSAGES.GROUP_NOT_FOUND;
          }
          return group;
        },
        update(id: string, updateGroupDto: UpdateGroupDto) {
          const group = mockData.mockGroupsArr.find((group) => group.id === id);
          if (!group) {
            return HTTP_RESPONSE_MESSAGES.GROUP_NOT_FOUND;
          }
          if (
            updateGroupDto.hasOwnProperty('name') &&
            updateGroupDto['name'] !== group.name
          ) {
            const group = mockData.mockGroupsArr.find(
              (group) => group.name === updateGroupDto['name'],
            );
            if (group) {
              return HTTP_RESPONSE_MESSAGES.GROUP_EXISTS;
            }
          }
          group.name = updateGroupDto.name || group.name;
          group.permission = updateGroupDto.permission || group.permission;
          return group;
        },
        remove(id: string) {
          const group = mockData.mockGroupsArr.find((group) => group.id === id);
          if (!group) {
            return HTTP_RESPONSE_MESSAGES.GROUP_NOT_FOUND;
          }
          const foundIndex = mockData.mockGroupsArr.findIndex(
            (item) => item.id == id,
          );
          mockData.mockGroupsArr.splice(foundIndex, 1);
        },
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [GroupsService, GroupsServiceProvider],
    }).compile();

    groupsController = app.get<GroupsController>(GroupsController);
  });

  describe('create', () => {
    it('should create a new group', async () => {
      const res = (await groupsController.create(
        mockData.firstMockCreateGroupDto,
      )) as mockData.IGroup;
      expect(res.name).toBe(mockData.firstMockGroup.name);
    });
  });

  describe('create', () => {
    it('should create another group', async () => {
      const res = (await groupsController.create(
        mockData.secondMockCreateGroupDto,
      )) as mockData.IGroup;
      expect(res.name).toBe(mockData.secondMockGroup.name);
    });
  });

  describe('create', () => {
    it(`should return exception - ${HTTP_RESPONSE_MESSAGES.GROUP_EXISTS}`, async () => {
      const res = (await groupsController.create(
        mockData.secondMockCreateGroupDto,
      )) as mockData.IGroup;
      expect(res).toBe(HTTP_RESPONSE_MESSAGES.GROUP_EXISTS);
    });
  });

  describe('findAll', () => {
    it('should return array of groups', async () => {
      const res = await groupsController.findAll();
      expect(Array.isArray(res)).toBe(true);
      expect(res.length).toBe(3);
    });
  });

  describe('findOne', () => {
    it('should find group by id', async () => {
      const res = await groupsController.findOne(mockData.mockGroupsArr[0].id);
      expect(typeof res).toBe('object');
      if (typeof res === 'object') {
        expect(res['id']).toBe(mockData.mockGroupsArr[0].id);
      }
    });
  });

  describe('findOne', () => {
    it(`should return exception - ${HTTP_RESPONSE_MESSAGES.GROUP_NOT_FOUND}`, async () => {
      const res = await groupsController.findOne(mockData.RandomID);
      expect(res).toBe(HTTP_RESPONSE_MESSAGES.GROUP_NOT_FOUND);
    });
  });

  describe('update', () => {
    it('should update group', async () => {
      const res = await groupsController.update(mockData.mockGroupsArr[1].id, {
        name: 'new user group',
      });
      expect(typeof res).toBe('object');
      if (typeof res === 'object') {
        expect(res['name']).toBe('new user group');
      }
    });
  });

  describe('update', () => {
    it(`should return exception ${HTTP_RESPONSE_MESSAGES.GROUP_NOT_FOUND}`, async () => {
      const res = await groupsController.update(mockData.RandomID, {
        name: 'new user group',
      });
      expect(res).toBe(HTTP_RESPONSE_MESSAGES.GROUP_NOT_FOUND);
    });
  });

  describe('remove', () => {
    it('should remove group', async () => {
      const id = mockData.mockGroupsArr[0].id;
      await groupsController.remove(id);
      const res = await groupsController.findOne(id);
      expect(res).toBe(HTTP_RESPONSE_MESSAGES.GROUP_NOT_FOUND);
    });
  });

  describe('remove', () => {
    it(`should return exception ${HTTP_RESPONSE_MESSAGES.GROUP_NOT_FOUND}`, async () => {
      const res = await groupsController.remove(mockData.RandomID);
      expect(res).toBe(HTTP_RESPONSE_MESSAGES.GROUP_NOT_FOUND);
    });
  });
});
