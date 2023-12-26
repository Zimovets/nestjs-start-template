// user.service.ts
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async sayHello(): Promise<string> {
    return 'Hello World from user module';
  }

  async createUser(user): Promise<User> {
    const newUser = this.em.create(User, user);
    await this.em.persistAndFlush(newUser);

    return newUser;
  }
}
