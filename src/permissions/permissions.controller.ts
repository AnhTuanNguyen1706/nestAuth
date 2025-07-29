import { Body, Controller, Get, Post } from '@nestjs/common';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  create(@Body('name') name: string) {
    return this.permissionsService.create(name);
  }

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }
}
