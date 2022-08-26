import { CreateGroupDto } from '../data-access/groups/create-group.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../data-access/users/create-user.dto';
import { PermissionsENUM } from './constants';

export const mockUsersArr = [
  {
    id: uuidv4(),
    isDeleted: false,
    login: 'Max Robertson',
    password: 'MaxSecret',
    age: 26,
  },
];

export const firstMockCreateUserDto: CreateUserDto = {
  login: 'Bradley Cooper',
  password: 'BradSecret',
  age: 47,
};

export const secondMockCreateUserDto: CreateUserDto = {
  login: 'Robert Downey Jr.',
  password: 'RobSecret',
  age: 26,
};

export const firstMockUser: IUser = getUserFromDto(firstMockCreateUserDto);
export const secondMockUser: IUser = getUserFromDto(secondMockCreateUserDto);

export const RandomID = uuidv4();

export function getUserFromDto(createUserDto: CreateUserDto) {
  return {
    id: uuidv4(),
    isDeleted: false,
    ...createUserDto,
  };
}

export interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export const mockGroupsArr = [
  {
    id: uuidv4(),
    name: 'Guests',
    permission: [PermissionsENUM.read],
  },
];

export const firstMockCreateGroupDto: CreateGroupDto = {
  name: 'Admins',
  permission: [
    PermissionsENUM.write,
    PermissionsENUM.read,
    PermissionsENUM.delete,
    PermissionsENUM.upload,
  ],
};

export const secondMockCreateGroupDto: CreateGroupDto = {
  name: 'Buyers',
  permission: [PermissionsENUM.write, PermissionsENUM.read],
};

export const firstMockGroup: IGroup = getGroupFromDto(firstMockCreateGroupDto);
export const secondMockGroup: IGroup = getGroupFromDto(
  secondMockCreateGroupDto,
);

export function getGroupFromDto(createGroupDto: CreateGroupDto) {
  return {
    id: uuidv4(),
    ...createGroupDto,
  };
}

export interface IGroup {
  id: string;
  name: string;
  permission: Array<PermissionsENUM>;
}
