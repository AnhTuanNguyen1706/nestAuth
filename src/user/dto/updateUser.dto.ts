import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUser.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  password?: string;

}
