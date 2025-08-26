import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entity/user.entity';
import { SocialUserDto } from './dto/social-user.dto';
import { Role } from '../roles/entity/roles.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const defaultRole = await this.roleRepository.findOneBy({ name: 'user' });
    if (!defaultRole) {
      throw new Error('Default role "user" not found');
    }
    const user = await this.userRepository.create({
      ...createUserDto,
      roles: [defaultRole],
    });
    return await this.userRepository.save(user);
  }

  async createSocialUser(socialUser: Partial<User>) {
    const user = this.userRepository.create({
      ...socialUser,
      roles: socialUser.roles,
    });
    return this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find({
      relations: ['roles', 'roles.permissions'],
    });
  }

  async findUserById(userId: number) {
    return await this.userRepository.findOneBy({ id: userId });
  }

  async findUserByName(username: string) {
    return await this.userRepository.findOneBy({ username: username });
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(userId, updateUserDto);
  }
}
