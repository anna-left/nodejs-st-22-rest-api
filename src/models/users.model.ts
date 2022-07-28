import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserCreationAttrs {
  login: string;
  password: string;
  age: number;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'John', description: 'user login' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    get() {
      return this.getDataValue('login');
    },
  })
  login: string;

  @ApiProperty({ example: 'secret123', description: 'password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 23, description: 'user age' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  age: number;

  @ApiProperty({ example: false, description: 'user deleted' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    get() {
      return this.getDataValue('isDeleted');
    },
  })
  isDeleted: boolean;
}
