import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './resources/prisma/prisma.module';
import { UserModule } from './resources/user/user.module';
import { AuthModule } from './resources/auth/auth.module';
import { JsonwebtokenModule } from './resources/jsonwebtoken/jsonwebtoken.module';
import { BrandModule } from './resources/brand/brand.module';
import { CategoryModule } from './resources/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrismaModule,
    UserModule,
    AuthModule,
    JsonwebtokenModule,
    BrandModule,
    CategoryModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
