import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateBrandDto {
  @ApiProperty({
    description: 'Название бренда',
    example: 'Nike',
  })
  @IsString({ message: 'Название бренда должно быть строкой' })
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  name: string;
}
