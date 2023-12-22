import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class UserSignUpDto {
  @IsNotEmpty()
  @IsEmail()
  readonly firstName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
