import { ApiProperty } from '@nestjs/swagger';

export class UploadProductImageDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
    description: 'Файл изображения товара',
  })
  files: Express.Multer.File[];
}
