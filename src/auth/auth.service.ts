import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/createUser.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.userService.findUserByName(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      console.log('aisdjasld', result);
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }
  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.userService.createUser({
      username: createUserDto.username,
      password: hashedPassword,
    });
  }

  login(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
