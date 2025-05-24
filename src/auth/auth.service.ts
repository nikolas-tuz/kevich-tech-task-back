import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTPayloadDto } from './dto/JWTPayload.dto';
import { sign } from 'jsonwebtoken';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '../../generated/prisma';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  private prisma = new PrismaClient();

  constructor(private readonly configService: ConfigService) {}

  generateToken(payload: JWTPayloadDto): string {
    const secret = this.configService.get<string>(`JWT_SECRET`);
    const expiresIn = this.configService.get<string>(`JWT_EXPIRES_AT`);

    return sign(payload, secret, { expiresIn });
  }

  async register(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (user) {
      throw new BadRequestException(`Email is already taken.`);
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const accessToken = this.generateToken({ email, id: newUser.id });

    return {
      status: `success`,
      data: { user: newUser, accessToken },
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User not found.`);
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw new BadRequestException(`Invalid email or password.`);
    }

    const accessToken = this.generateToken({ email, id: user.id });

    return {
      status: `success`,
      data: { user, accessToken },
    };
  }
}
