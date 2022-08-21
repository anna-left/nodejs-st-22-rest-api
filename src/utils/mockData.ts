import { CreateUserDto } from 'src/data-access/users/create-user.dto';
import { v4 as uuidv4 } from 'uuid';

const mockDB = [
  {
    id: uuidv4(),
    isDeleted: false,
    login: 'Max Robertson',
    password: 'MaxSecret',
    age: 26,
  },
];

const firstMockCreateUserDto: CreateUserDto = {
  login: 'Bradley Cooper',
  password: 'BradSecret',
  age: 47,
};

const secondMockCreateUserDto: CreateUserDto = {
  login: 'Robert Downey Jr.',
  password: 'RobSecret',
  age: 26,
};

const firstMockUser: IUser = getUserFromDto(firstMockCreateUserDto);
const secondMockUser: IUser = getUserFromDto(secondMockCreateUserDto);

const RandomID = uuidv4();

function getUserFromDto(createUserDto: CreateUserDto) {
  return {
    id: uuidv4(),
    isDeleted: false,
    ...createUserDto,
  };
}

interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export {
  firstMockCreateUserDto,
  secondMockCreateUserDto,
  firstMockUser,
  secondMockUser,
  IUser,
  getUserFromDto,
  mockDB,
  RandomID,
};
