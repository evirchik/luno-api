import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './configs/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';
import path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //swagger
  SwaggerModule.setup('docs', app, swaggerConfig(app));

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  // validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  //root settings
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  await app.listen(process.env.PORT!);
}
bootstrap();
