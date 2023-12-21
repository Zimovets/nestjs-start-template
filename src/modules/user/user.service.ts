// user.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  sayHello(): string {
    return 'Hello World from user module';
  }
}
