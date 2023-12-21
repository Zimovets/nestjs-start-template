// user.service.ts
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async sayHello(): Promise<string> {
    const user = this.em.create(User, {
      firstName: 'Serhii',
      lastName: 'Zimovets',
      email: 'testtt@gmail.com',
      password: 'sdfsfsdfsdfsd',
    });
    await this.em.persistAndFlush(user);

    return 'Hello World from user module';
  }
}
