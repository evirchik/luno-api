import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findById(id: string) {
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    return await this.prisma.category.findUnique({
      where: { name },
    });
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const findCategory = await this.findByName(createCategoryDto.name);
    if (findCategory) {
      throw new ConflictException('Категория с таким названием уже существует');
    }
    return await this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const findCategory = await this.findById(id);
    if (!findCategory) {
      throw new ConflictException('Такой категории не существует');
    }
    return await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async delete(id: string) {
    const findCategory = await this.findById(id);
    if (!findCategory) {
      throw new ConflictException('Такой категории не существует');
    }
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
