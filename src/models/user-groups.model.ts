import { Column, ForeignKey, IsUUID, Model, Table } from 'sequelize-typescript';
import { Group } from './groups.model';
import { User } from './users.model';

@Table({ tableName: 'user_groups', createdAt: false, updatedAt: false })
export class UserGroups extends Model<UserGroups> {
  @IsUUID(4)
  @Column({
    unique: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Group)
  @IsUUID(4)
  @Column
  groupId: string;

  @ForeignKey(() => User)
  @IsUUID(4)
  @Column
  userId: string;
}
