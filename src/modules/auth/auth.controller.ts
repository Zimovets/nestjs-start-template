import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { DoesUserExist } from './guards/doesUserExist.guard';
import { UserSignUpDto } from './dto/userSignUp.dto';
import { AuthService } from './auth.service';
import { SignResponse } from 'src/response/signUpResponse';
import { AuthGuard } from '@nestjs/passport';

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
}

// TODO: implement local strategy for signin
// TODO: delete first test case
// TODO: tests for signin
// TODO: implement refresh token and test it
// TODO: investigate maybe remove jwt module registration from app to auth
