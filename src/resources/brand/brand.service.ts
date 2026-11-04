import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBrandDto } from './dto/create-brand';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.brand.findMany();
  }

  async findById(id: string) {
    return await this.prisma.brand.findUnique({
      where: { id },
    });
  }

  async findByName(name: string) {
    return await this.prisma.brand.findUnique({
      where: { name },
    });
  }

  async create(createBrandDto: CreateBrandDto) {
    const findBrand = await this.findByName(createBrandDto.name);
    if (findBrand) {
      throw new ConflictException('Бренд с таким названием уже существует');
    }
    return await this.prisma.brand.create({
      data: createBrandDto,
    });
  }

  async update(id: string, updateBrandDto: Partial<CreateBrandDto>) {
    return await this.prisma.brand.update({
      where: { id },
      data: updateBrandDto,
    });
  }

  async delete(id: string) {
    return await this.prisma.brand.delete({
      where: { id },
    });
  }
}
