import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNotEmpty, IsEnum, IsUUID } from 'class-validator';
import { PermissionsENUM, permissionsTypes } from 'src/utils/constants';

export class CreateGroupDto {
  @ApiProperty({ example: 'Admins', description: 'group name' })
  @IsString()
  @IsUUID('4')
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'Admins', description: 'permissions' })
  @IsArray()
  @IsNotEmpty()
  @IsEnum(PermissionsENUM, {
    each: true,
    message: `Permissions must be values from the list: ${permissionsTypes}`,
  })
  readonly permission: Array<PermissionsENUM>;
}
