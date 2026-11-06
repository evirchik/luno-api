import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  getAllProducts(@Query() queryProductDto: QueryProductDto) {
    return this.productService.findAll(queryProductDto);
  }

  @Get('by-id/:id')
  getProductById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Get('by-sku/:sku')
  getProductBySku(@Param('sku') sku: string) {
    return this.productService.findBySku(sku);
  }

  @Get('by-category/:categoryId')
  getProductByCategory(
    @Query() queryProductDto: QueryProductDto,
    @Param('categoryId') categoryId: string,
  ) {
    return this.productService.findByCategory(
      categoryId,
      queryProductDto.limit,
    );
  }

  @Get('by-brand/:brandId')
  getProductByBrand(
    @Query() queryProductDto: QueryProductDto,
    @Param('brandId') brandId: string,
  ) {
    return this.productService.findByBrand(brandId, queryProductDto.limit);
  }

  @Post('create')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Patch('update/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete('delete/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
