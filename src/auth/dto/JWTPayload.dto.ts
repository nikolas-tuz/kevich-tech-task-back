import { IsEmail, IsUUID } from 'class-validator';

export class JWTPayloadDto {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;
}
