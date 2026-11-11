import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class QueryCategoryDto {
  @ApiProperty({ example: 'Кроссовки' })
  @IsString({ message: 'Поиск должен быть строкой' })
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  search: string;
}
