import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from 'src/entities/user.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { UserSignUpDto } from './dto/userSignUp.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignResponse } from 'src/response/signUpResponse';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: UserSignUpDto): Promise<SignResponse> {
    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(user.password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');
    user.password = result;

    const newUser = await this.userService.createUser(user);

    return await this.generateResWIthTokenPair(newUser);
  }

  async signIn(user: User): Promise<SignResponse> {
    return await this.generateResWIthTokenPair(user);
  }

  async generateResWIthTokenPair(user: User): Promise<SignResponse> {
    const { id, email } = user;
    const refreshExpiresIn = this.configService.get('jwt.refreshExpiresIn');
    const token = this.jwtService.sign({
      sub: id,
      email: email,
    });

    const refreshToken = this.jwtService.sign(
      { sub: id },
      { expiresIn: refreshExpiresIn },
    );

    return {
      userId: id,
      token,
      refreshToken,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const dbUser = await this.em.findOne(User, { email });
    if (!dbUser) {
      throw new BadRequestException('User with this email not found');
    }

    const [salt, storedHash] = dbUser.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong password');
    }

    return dbUser;
  }
}
