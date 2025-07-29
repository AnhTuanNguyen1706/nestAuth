import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Roles } from '../roles/decorator/roles.decorator';
import { RolesGuard } from '../roles/decorator/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('createUser')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findUser(@Param() id: number) {
    return await this.userService.findUserById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Get()
  async findAllUser() {
    return await this.userService.findAll();
  }

  @Post(':id')
  async updateUser(@Param() id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(id, updateUserDto);
  }
}
