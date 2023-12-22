// user.service.ts
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserSignUpDto } from '../auth/dto/userSignUp.dto';

@Injectable()
export class UserService {
  constructor(private readonly em: EntityManager) {}

  async sayHello(): Promise<string> {
    return 'Hello World from user module';
  }

  async createUser(user: UserSignUpDto): Promise<User> {
    const newUser = this.em.create(User, user);
    await this.em.persistAndFlush(user);

    return newUser;
  }
}
