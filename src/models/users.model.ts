import { ApiProperty } from '@nestjs/swagger';
import {
  AllowNull,
  Column,
  DataType,
  // Default,
  // IsUUID,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

interface UserCreationAttrs {
  login: string;
  password: string;
  age: number;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({
    example: '390c2ee1-4ace-4085-809f-7b9ed9626635',
    description: 'Unique identificator',
  })
  @Column({ primaryKey: true, defaultValue: DataTypes.UUIDV4 })
  id: string;

  @ApiProperty({ example: 'John', description: 'user login' })
  @AllowNull(false)
  @Unique
  @Column
  login: string;

  @ApiProperty({ example: 'secret123', description: 'password' })
  @AllowNull(false)
  @Column
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
