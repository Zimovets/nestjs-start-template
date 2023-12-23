import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class UserSignUpDto {
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
