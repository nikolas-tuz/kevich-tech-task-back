import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minUppercase: 1,
    },
    {
      message: `The password should contain at least 8 chars and 1 uppercase letter.`,
    },
  )
  password: string;
}
