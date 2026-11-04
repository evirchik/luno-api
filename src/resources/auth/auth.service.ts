import { ConflictException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import bcrypt from 'bcrypt';
import { JsonwebtokenService } from '../jsonwebtoken/jsonwebtoken.service';
import type { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jsonwebtokenService: JsonwebtokenService,
  ) {}

  async register(createUserDto: CreateUserDto, response: Response) {
    const findUser = await this.userService.findByEmail(createUserDto.email);

    if (findUser) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const tokens = this.jsonwebtokenService.generateTokens({
      email: newUser.email,
      id: newUser.id,
    });

    return response
      .status(201)
      .cookie('refreshToken', tokens.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        accessToken: tokens.access,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          phone: newUser.phone,
          address: newUser.address,
        },
      });
  }

  async login(loginUserDto: LoginUserDto, response: Response) {
    const findUser = await this.userService.findByEmail(loginUserDto.email);

    if (!findUser) {
      throw new ConflictException('Неверный логин или пароль');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      findUser.password,
    );

    if (!isPasswordValid) {
      throw new ConflictException('Неверный логин или пароль');
    }

    const tokens = this.jsonwebtokenService.generateTokens({
      email: findUser.email,
      id: findUser.id,
    });

    return response
      .status(201)
      .cookie('refreshToken', tokens.refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        accessToken: tokens.access,
        user: {
          id: findUser.id,
          email: findUser.email,
          name: findUser.name,
          phone: findUser.phone,
          address: findUser.address,
        },
      });
  }
}
