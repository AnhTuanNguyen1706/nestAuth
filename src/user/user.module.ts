import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../roles/entity/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
