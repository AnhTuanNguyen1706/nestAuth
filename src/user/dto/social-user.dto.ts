import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OAuthProvider } from '../../user/entity/user.entity';
import { Role } from '../../roles/entity/roles.entity';

export class SocialUserDto {
  @IsEnum(OAuthProvider, {
    message: 'provider must be google, facebook, or github',
  })
  provider: OAuthProvider;

  @IsString()
  providerId: string;

  @IsOptional()
  roles?: Role[];

  @IsOptional()
  @IsString()
  emails?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
