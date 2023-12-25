import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { DoesUserExist } from './guards/doesUserExist.guard';
import { UserSignUpDto } from './dto/userSignUp.dto';
import { AuthService } from './auth.service';
import { SignResponse } from 'src/response/signUpResponse';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  @Post('signin')
  async signIn(@Request() req): Promise<SignResponse> {
    return await this.authService.signIn(req.user);
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  async signUp(@Body() user: UserSignUpDto): Promise<SignResponse> {
    return await this.authService.signUp(user);
  }

  @HttpCode(200)
  @Post('refresh')
  async refreshToken(@Body() refreshToken: RefreshTokenDto) {
    const token = refreshToken.token;

    if (!token) {
      throw new BadRequestException('There is no refresh token');
    }

    return await this.authService.refresh(token);
  }
}

// TODO: delete first test case
// TODO: implement refresh token and test it
// TODO: investigate maybe remove jwt module registration from app to auth
// TODO: investigate microORM source code
// TODO: add swagger
// TODO: implement signin with google
// TODO: replace strings in Exceptions
// TODO: implement jwt stategy
