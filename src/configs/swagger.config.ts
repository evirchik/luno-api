import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Luno API')
  .setDescription('The Luno API documentation')
  .setVersion('1.0.0')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'authorization',
  )
  .build();
export const swaggerConfig = (app: INestApplication) =>
  SwaggerModule.createDocument(app, config);
