import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  Response,
  HttpCode,
  Get,
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
    return await this.authService.refresh(refreshToken.token);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<void> {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Request() req, @Response() res): Promise<void> {
    res.send(req.user);
  }
}

// TODO: delete first test case
// TODO: investigate maybe remove jwt module registration from app to auth
// TODO: investigate microORM source code
// TODO: add swagger
// TODO: replace strings in Exceptions
// TODO: implement jwt stategy
// TODO: inestigate why test dont work with test:watch
// TODO: add not deleted condition to findOneUser
// TODO: figureout how to logout from google
