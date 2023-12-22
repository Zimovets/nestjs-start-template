import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from 'src/entities/user.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { UserSignUpDto } from './dto/userSignUp.dto';
import { UserSignInDto } from './dto/userSignIn.dto ';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    private readonly userService: UserService,
  ) {}

  async signUp(user: UserSignUpDto) {
    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(user.password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');
    user.password = result;

    return await this.userService.createUser(user);
  }

  async signIn(user: UserSignInDto) {
    const dbUser = await this.em.findOne(User, { email: user.email });
    if (!dbUser) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = dbUser.password.split('.');

    const hash = (await scrypt(user.password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong password');
    }

    return user;
  }
}
