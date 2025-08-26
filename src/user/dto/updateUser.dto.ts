import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './createUser.dto';
import { IsOptional, IsString } from 'class-validator';
import { OAuthProvider } from '../entity/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  passwordHashed?: string;

  @IsOptional()
  @IsString()
  provider?: OAuthProvider | undefined;

  @IsOptional()
  @IsString()
  providerId?: string;
}
