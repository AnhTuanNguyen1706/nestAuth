import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async findAllRole() {
    return await this.rolesService.findAll();
  }

  @Post(':id/permissions')
  async createRole(
    @Param('id', ParseIntPipe) id: number,
    @Body('permissionIds') permissionIds: number[],
  ) {
    return await this.rolesService.assignPermissions(id, permissionIds);
  }
}
