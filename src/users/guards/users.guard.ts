import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from '../../auth/roles/guards/roles.guard';

@Injectable()
export class UsersGuard extends RolesGuard implements CanActivate {

  constructor ( protected readonly reflector : Reflector ) {
    super(reflector)
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    const body = request.body;

    if (body.id === user.id) {

      return true
    } 

    return super.canActivate(context);

  }
}
