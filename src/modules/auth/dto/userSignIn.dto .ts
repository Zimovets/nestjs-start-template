import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class UserSignInDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
