import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { JWTDecodedInterface } from './interfaces/JWTDecoded.interface';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class AuthGuard implements CanActivate {
  private prisma = new PrismaClient();

  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization token is missing or invalid.',
      );
    }

    const token = authHeader.split(' ')[1];
    const secret = this.configService.get<string>('JWT_SECRET');

    try {
      // Verify the token
      const decoded = verify(token, secret) as JWTDecodedInterface;

      const user = await this.prisma.user.findFirst({
        where: { email: decoded.email },
      });

      if (!user) {
        throw new NotFoundException('Invalid email or password');
      }
      // let's not expose the password.
      delete user.password;

      console.log(user);

      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
