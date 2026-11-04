import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail({}, { message: 'Электронный адрес некорректен' })
  email: string;

  @ApiProperty({ example: 'P@ssw0rd!' })
  @IsStrongPassword(
    {},
    {
      message:
        'Пароль должен содержать не менее 8 символов, включая заглавные и строчные буквы, цифры и специальные символы',
    },
  )
  password: string;

  @IsOptional()
  @ApiProperty({ example: 'John Doe' })
  @IsString({ message: 'Имя должно быть строкой' })
  name: string;

  @IsOptional()
  @ApiProperty({ example: '+7 (999) 123-45-67' })
  @IsString({ message: 'Телефон должен быть строкой' })
  phone: string;

  @IsOptional()
  @ApiProperty({ example: '123 Main St, Anytown, USA' })
  @IsString({ message: 'Адрес должен быть строкой' })
  address: string;
}
