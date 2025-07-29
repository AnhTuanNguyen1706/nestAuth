import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
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

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(userId, updateUserDto);
  }
}
