import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonwebtokenService } from '../../jsonwebtoken/jsonwebtoken.service';
import type { Request } from 'express';
import { TokenExpiredError } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jsonwebtokenService: JsonwebtokenService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const accessToken = request.headers.authorization;

    const [type, token] = accessToken?.split(' ') ?? [];
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    try {
      const payload = this.jsonwebtokenService.verifyAccessToken(token);

      const findUser = await this.userService.findById(payload.id);
      if (!findUser) {
        throw new UnauthorizedException('Пользователь не авторизован');
      }
      request.user = payload;
      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Срок действия токена истек');
      }
      throw new UnauthorizedException('Пользователь не авторизован');
    }
  }
}
