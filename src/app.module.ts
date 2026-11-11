import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './resources/prisma/prisma.module';
import { UserModule } from './resources/user/user.module';
import { AuthModule } from './resources/auth/auth.module';
import { JsonwebtokenModule } from './resources/jsonwebtoken/jsonwebtoken.module';
import { BrandModule } from './resources/brand/brand.module';
import { CategoryModule } from './resources/category/category.module';
import { ProductModule } from './resources/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      expandVariables: true,
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    JsonwebtokenModule,
    BrandModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
