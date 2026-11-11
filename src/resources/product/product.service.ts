import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { BrandService } from '../brand/brand.service';
import { CategoryService } from '../category/category.service';
import { generateSku } from '../../utils/sku.generated';
import { UpdateProductDto } from './dto/update-product.dto';
import * as fs from 'fs';
import { QueryProductDto } from './dto/query-product.dto';
import { Prisma } from '../../generated/prisma/client';
import path from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly brandService: BrandService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { productVariants, ...productData } = createProductDto;
    const findCategory = await this.categoryService.findById(
      createProductDto.categoryId,
    );
    const findBrand = await this.brandService.findById(
      createProductDto.brandId,
    );

    if (!findBrand) {
      throw new NotFoundException('Такого бренда нет');
    }

    if (!findCategory) {
      throw new NotFoundException('Такой категории нет');
    }
    const sku = generateSku({
      brandName: findBrand.name,
      categoryName: findCategory.name,
      productName: createProductDto.name,
    });

    const findProduct = await this.findBySku(sku);

    if (findProduct) {
      throw new ConflictException('Такой товар уже существует');
    }
    return await this.prisma.product.create({
      data: {
        ...productData,
        SKU: sku,
        productVariants: {
          create: productVariants,
        },
      },
      include: {
        productVariants: true,
      },
    });
  }

  async createImage(files: Express.Multer.File[]) {
    const uploadPath = path.join(
      process.cwd(),
      'uploads',
      'images',
      'products',
    );
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    const savedFiles = [];
    for (const file of files) {
      const extension = path.extname(file.originalname);
      const filename = `${randomUUID()}${extension}`;

      const filePath = path.join(uploadPath, filename);

      fs.writeFileSync(filePath, file.buffer);

      savedFiles.push({
        filename,
        path: `${process.env.SERVER_URLа}/uploads/images/products/${filename}`,
      });
    }
    return savedFiles;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const findProduct = await this.findById(id);
    if (!findProduct) {
      throw new NotFoundException('Товар для обновления не найден');
    }
    const { productVariants, ...productData } = updateProductDto;

    return await this.prisma.$transaction(async (tx) => {
      return await tx.product.update({
        where: { id },
        data: productData,
        include: {
          productVariants: true,
        },
      });
    });
  }

  async delete(id: string) {
    const findProduct = await this.findById(id);
    if (!findProduct) {
      throw new NotFoundException('Товар для обновления не найден');
    }

    return await this.prisma.product.delete({ where: { id } });
  }

  async findAll(queryProductDto: QueryProductDto) {
    const { limit, minPrice, maxPrice, category, brand, sizes, search } =
      queryProductDto;

    const options: Prisma.ProductWhereInput = {};

    if (minPrice !== undefined || maxPrice !== undefined) {
      options.price = {};
      if (minPrice !== undefined) options.price.gte = minPrice;
      if (maxPrice !== undefined) options.price.lte = maxPrice;
    }
    if (category) {
      options.category = {
        name: { in: category, mode: 'insensitive' },
      };
    }
    if (brand) {
      options.brand = {
        name: { in: brand, mode: 'insensitive' },
      };
    }

    if (sizes && sizes.length > 0) {
      options.productVariants = {
        some: {
          size: { in: sizes },
          quantity: { gt: 0 },
          isActive: true,
        },
      };
    }
    if (search) {
      options.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.product.findMany({
      where: options,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        productVariants: true,
        category: { select: { name: true } },
        brand: { select: { name: true } },
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  async findBySku(sku: string) {
    return await this.prisma.product.findUnique({ where: { SKU: sku } });
  }

  async findByCategory(categoryId: string, limit: number = 10) {
    if (isNaN(limit) || limit <= 0) {
      throw new BadRequestException('Неверное получение товаров');
    }
    return await this.prisma.product.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        categoryId,
      },
    });
  }

  async findByBrand(brandId: string, limit: number = 10) {
    if (isNaN(limit) || limit <= 0) {
      throw new BadRequestException('Неверное получение товаров');
    }
    return await this.prisma.product.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        brandId,
      },
    });
  }
}
