import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { DoesUserExist } from './guards/doesUserExist.guard';
import { UserSignUpDto } from './dto/userSignUp.dto';
import { UserSignInDto } from './dto/userSignIn.dto ';
import { AuthService } from './auth.service';
import { SignResponse } from 'src/response/signUpResponse';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() user: UserSignInDto) {
    return await this.authService.signIn(user);
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  async signUp(@Body() user: UserSignUpDto): Promise<SignResponse> {
    return await this.authService.signUp(user);
  }
}
