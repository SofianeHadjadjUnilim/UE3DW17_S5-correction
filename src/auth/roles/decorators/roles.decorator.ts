import { SetMetadata } from '@nestjs/common';
import { Roles } from '../models/roles.enum';

export const ROLES_KEY = 'roles';
export const DecoRoles = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
