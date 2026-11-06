import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Название категории',
    example: 'Кроссовки',
  })
  @IsString({ message: 'Название категории должно быть строкой' })
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  name: string;
}

