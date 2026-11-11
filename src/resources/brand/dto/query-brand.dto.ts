import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class QueryBrandDto {
  @ApiProperty({ example: 'Nike' })
  @IsString({ message: 'Поиск должен быть строкой' })
  @Transform(({ value }: { value: string }) => value.toLowerCase())
  search: string;
}
