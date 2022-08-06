import { DataTypes } from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { PermissionsENUM } from 'src/utils/constants';
import { User } from 'src/models/users.model';
import { UserGroups } from 'src/models/user-groups.model';

interface GroupCreationAttrs {
  name: string;
  permission: Array<PermissionsENUM>;
}

const permissionsTypes = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

@Table({ tableName: 'groups' })
export class Group extends Model<Group, GroupCreationAttrs> {
  @ApiProperty({
    example: '390c2ee1-4ace-4085-809f-7b9ed9626633',
    description: 'Unique identificator',
  })
  @Column({ primaryKey: true, defaultValue: DataTypes.UUIDV4 })
  id: string;

  @ApiProperty({ example: 'admins', description: 'group name' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: '[READ, WRITE]', description: 'permissions' })
  @Column({
    type: DataType.ARRAY(
      DataTypes.ENUM({
        values: permissionsTypes,
      }),
    ),
    allowNull: true,
  })
  permission: Array<PermissionsENUM>;

  @BelongsToMany(() => User, () => UserGroups)
  users: User[];
}
