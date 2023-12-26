import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { EntityManager } from '@mikro-orm/postgresql';
import { User } from 'src/entities/user.entity';

@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(private readonly em: EntityManager) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const userExist = await this.em.findOne(User, {
      email: request.body.email,
      deletedAt: null,
    });
    if (userExist) {
      throw new ForbiddenException('This email already exist');
    }
    return true;
  }
}
