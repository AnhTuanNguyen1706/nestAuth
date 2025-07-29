import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entity/roles.entity';
import { Repository } from 'typeorm';
import { Permission } from '../permissions/entity/permissions.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>,
  ) {}
  async create(name: string) {
    const role = await this.roleRepo.create({ name });
    return await this.roleRepo.save(role);
  }

  findAll(): Promise<Role[]> {
    return this.roleRepo.find({ relations: ['permissions'] });
  }

  async assignPermissions(roleId: number, permissionIds: number[]) {
    const role = await this.roleRepo.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });
    if (role) {
      role.permissions = permissionIds.map((id) => ({ id }) as Permission);
      return this.roleRepo.save(role);
    }
    throw new NotFoundException('Role not found');
  }
}
