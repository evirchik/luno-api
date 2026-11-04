import { Global, Module } from '@nestjs/common';
import { JsonwebtokenService } from './jsonwebtoken.service';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  controllers: [],
  providers: [JsonwebtokenService],
  imports: [JwtModule.register({ global: true })],
  exports: [JsonwebtokenService],
})
export class JsonwebtokenModule {}
