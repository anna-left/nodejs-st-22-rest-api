import { CreateUserDto } from 'src/data-access/users/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

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