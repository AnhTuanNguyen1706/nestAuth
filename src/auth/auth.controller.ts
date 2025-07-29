import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.validateUser(
      createUserDto.username,
      createUserDto.password,
    );
    return this.authService.login(user);
  }
}
