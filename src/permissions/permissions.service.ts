import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entity/permissions.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  create(name: string): Promise<Permission> {
    const permission = this.permissionRepo.create({ name });
    return this.permissionRepo.save(permission);
  }

  findAll(): Promise<Permission[]> {
    return this.permissionRepo.find();
  }
}
