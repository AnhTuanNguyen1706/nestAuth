import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? 'user')
  role?: string;
}
