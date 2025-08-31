import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { OAuthProvider } from '../user/entity/user.entity';
import { SocialUserDto } from '../user/dto/social-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../roles/entity/roles.entity';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async validateOAuthLogin(profile: any, provider: OAuthProvider) {
    const emails = profile.emails?.[0]?.value;

    let user = await this.userService.findUserByEmail(emails);
    console.log('qwqw', user);
    if (!user) {
      const socialUser: SocialUserDto = {
        provider: provider,
        providerId: profile.id,
        username: profile.displayName || profile.username,
        emails,
        avatar: profile.photos?.[0]?.value,
      };
      const defaultRole = await this.roleRepository.findOneBy({
        name: 'user',
      });
      if (!defaultRole) {
        throw new Error('Default role "user" not found');
      }

      user = await this.userService.createSocialUser({
        ...socialUser,
        roles: [defaultRole],
      });
    }

    return this.login(user);
  }
  async validateUser(username: string, password: string) {
    const user = await this.userService.findUserByName(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    console.log('asd');
    throw new UnauthorizedException('Invalid credentials');
  }
  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.userService.createUser({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
    });
  }

  login(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles?.map((r) => r.name),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
