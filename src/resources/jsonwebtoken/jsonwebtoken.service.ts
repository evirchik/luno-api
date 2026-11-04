import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface TokenUserPayload {
  email: string;
  id: string;
}

@Injectable()
export class JsonwebtokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateTokens(payload: TokenUserPayload): {
    access: string;
    refresh: string;
  } {
    return {
      access: this.jwtService.sign(payload, {
        expiresIn: '15m',
        secret: process.env.JWT_ACCESS_SECRET,
      }),
      refresh: this.jwtService.sign(
        { id: payload.id },
        { expiresIn: '7d', secret: process.env.JWT_REFRESH_SECRET },
      ),
    };
  }

  verifyAccessToken(token: string): TokenUserPayload {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    }) as TokenUserPayload;
  }
}
