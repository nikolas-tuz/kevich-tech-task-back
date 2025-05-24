import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTPayloadDto } from './dto/JWTPayload.dto';
import { sign } from 'jsonwebtoken';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  generateToken(payload: JWTPayloadDto): string {
    const secret = this.configService.get<string>(`JWT_SECRET`);
    const expiresIn = this.configService.get<string>(`JWT_EXPIRES_AT`);

    return sign(payload, secret, { expiresIn });
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    /* TODO: CREATE USER */
  }

  async loginUser(email: string, password: string) {
    /* TODO: CREATE USER */
  }
}
