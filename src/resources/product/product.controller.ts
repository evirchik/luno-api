import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadProductImageDto } from './dto/image-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('all')
  getAllProducts(@Body() queryProductDto: QueryProductDto) {
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
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post('create/image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Изображения товара',
    type: UploadProductImageDto,
  })
  @UseInterceptors(FilesInterceptor('files', 10))
  createImageProduct(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({
            fileType: /^image\/(png|jpeg|jpg|webp)$/,
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    return this.productService.createImage(files);
  }

  @Patch('update/:id')
  updateProduct(
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
