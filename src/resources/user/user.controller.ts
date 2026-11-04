import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth-guard';
import type { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('authorization')
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() request: Request) {
    return this.userService.findById(request.user.id);
  }
}
