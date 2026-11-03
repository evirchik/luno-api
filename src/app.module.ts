import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './resources/prisma/prisma.module';
import { UserModule } from './resources/user/user.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), PrismaModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
