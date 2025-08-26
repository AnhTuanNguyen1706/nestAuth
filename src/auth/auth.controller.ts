import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { SocialUserDto } from '../user/dto/social-user.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
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
  @Post('login/social')
  async socialLogin(@Body() socialUserDto: SocialUserDto) {
    const user = await this.authService.validateOAuthLogin(
      socialUserDto,
      socialUserDto.provider,
    );
    return this.authService.login(user);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.login(req.user);
  }
}
