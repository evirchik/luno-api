import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import type { Request, Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './guard/auth-guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    return this.authService.register(createUserDto, response);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto, @Res() response: Response) {
    return this.authService.login(loginUserDto, response);
  }


}
