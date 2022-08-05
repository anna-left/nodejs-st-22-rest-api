import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNotEmpty } from 'class-validator';
import { Permission } from '../models/groups.model';

export class CreateGroupDto {
  @ApiProperty({ example: 'Admins', description: 'group name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Admins', description: 'permissions' })
  @IsArray()
  @IsNotEmpty()
  readonly permission: Array<Permission>;
}
