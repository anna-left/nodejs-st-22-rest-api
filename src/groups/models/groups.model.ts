import { DataTypes } from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';
import {
  // BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
// import { User } from 'src/users/models/users.model';
// import { UserGroup } from 'src/user-group/models/users-groups.model';

interface GroupCreationAttrs {
  name: string;
  permission: Array<Permission>;
}

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

@Table({ tableName: 'groups' })
export class Group extends Model<Group, GroupCreationAttrs> {
  @ApiProperty({
    example: '390c2ee1-4ace-4085-809f-7b9ed9626633',
    description: 'Unique identificator',
  })
  @Column({
    type: DataTypes.UUIDV4,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @ApiProperty({ example: 'admins', description: 'group name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: '[READ, WRITE]', description: 'permissions' })
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  permission: Array<Permission>;

  // @BelongsToMany(() => User, () => UserGroup)
  // users: User[];
}
