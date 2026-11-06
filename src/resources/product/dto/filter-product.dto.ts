import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class FilterProductDto {
  @ApiProperty({
    description: 'Минимальная цена товара',
    required: false,
    example: 1000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Минимальная цена должна быть числом' })
  @Min(0, { message: 'Цена не может быть отрицательной' })
  minPrice?: number;

  @ApiProperty({
    description: 'Максимальная цена товара',
    required: false,
    example: 15000,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Максимальная цена должна быть числом' })
  @Min(0, { message: 'Цена не может быть отрицательной' })
  maxPrice?: number;

  @ApiProperty({
    description: 'Категория',
    required: false,
    example: 'Кроссовки',
  })
  @IsOptional()
  @IsString({ message: 'Категория должен быть строкой' })
  category?: string;

  @ApiProperty({
    description: 'Бренд',
    required: false,
    example: 'Nike',
  })
  @IsOptional()
  @IsString({ message: 'Бренд должен быть строкой' })
  brand?: string;

  @ApiProperty({
    description: 'Массив размеров для фильтрации',
    required: false,
    type: [String],
    example: ['XL'],
  })
  @IsOptional()
  @Transform(({ value }: { value: unknown }) => {
    if (typeof value === 'string') return [value];
    return Array.isArray(value) ? value : [];
  })
  @IsArray({ message: 'Размеры должны быть переданы в виде массива' })
  @IsString({ each: true, message: 'Каждый размер должен быть строкой' })
  sizes?: string[];

  @ApiProperty({
    description: 'Поисковый запрос (по названию или описанию)',
    required: false,
    example: 'Nike Air',
  })
  @IsOptional()
  @IsString({ message: 'Поисковый запрос должен быть строкой' })
  search?: string;
}
