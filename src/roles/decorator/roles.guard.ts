// src/common/guards/roles.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log('asdasdas', requiredRoles);
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    console.log('aksldanzxc', user);
    return requiredRoles.some((role) => user?.role === role);
  }
}
