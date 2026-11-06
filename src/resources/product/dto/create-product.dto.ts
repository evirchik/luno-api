import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Prisma } from '../../../generated/prisma/client';
import { Type } from 'class-transformer';

export class CreateProductVariantDto {
  @ApiProperty({
    description: 'Размер товара (например, "42", "XL")',
    example: 'XL',
  })
  @IsNotEmpty()
  @IsString({ message: 'Размер должен быть строкой' })
  size: string;

  @ApiProperty({ description: 'Количество товара на складе', example: 10 })
  @IsNotEmpty()
  @IsInt({ message: 'Количество должно быть целым числом' })
  @Min(0, { message: 'Количество не может быть отрицательным' })
  quantity: number;

  @ApiProperty({
    description: 'Активен ли данный размер',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Поле isActive должно быть булевым значением' })
  isActive?: boolean;
}

export class CreateProductDto {
  @ApiProperty({
    description: 'Название продукта',
    example: 'Nike Air Max',
  })
  @IsNotEmpty()
  @IsString({ message: 'Название должно быть строкой' })
  name: string;

  @ApiProperty({
    description: 'Описание продукта',
    example: 'Удобные спортивные кроссовки',
  })
  @IsNotEmpty()
  @IsString({ message: 'Описание должно быть строкой' })
  description: string;

  @ApiProperty({ description: 'Цена продукта', example: 8990.5 })
  @IsNotEmpty()
  @IsNumber({}, { message: 'Цена должна быть числом' })
  @Min(0, { message: 'Цена не может быть отрицательной' })
  price: number;

  @ApiProperty({
    description: 'Старая цена (до скидки)',
    example: 11990.0,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Старая цена должна быть числом' })
  @Min(0, { message: 'Старая цена не может быть отрицательной' })
  oldPrice?: number;

  @ApiProperty({
    description: 'Ссылки на изображения товара',
    example: ['https://example.com'],
  })
  @IsNotEmpty()
  @IsArray({ message: 'imageUrls должен быть массивом строк' })
  @IsString({
    each: true,
    message: 'Каждая ссылка на изображение должна быть строкой',
  })
  imageUrls: string[];

  @ApiProperty({
    description: 'Состав или характеристики товара (JSON)',
    example: { material: 'leather', sole: 'rubber' },
  })
  @IsNotEmpty()
  @IsObject({ message: 'Состав должен быть объектом JSON' })
  compound: Prisma.InputJsonValue;

  @ApiProperty({ description: 'ID категории', example: 'category-uuid-123' })
  @IsNotEmpty()
  @IsString({ message: 'ID категории должен быть строкой' })
  categoryId: string;

  @ApiProperty({ description: 'ID бренда', example: 'brand-uuid-123' })
  @IsNotEmpty()
  @IsString({ message: 'ID бренда должен быть строкой' })
  brandId: string;

  @ApiProperty({
    description: 'Список размеров и их количества',
    type: [CreateProductVariantDto],
  })
  @IsNotEmpty()
  @IsArray({ message: 'Варианты продукта должны быть массивом' })
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  productVariants: CreateProductVariantDto[];
}
