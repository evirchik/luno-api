import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand';
import { UpdateBrandDto } from './dto/update-brand';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get('all')
  async getAllBrands() {
    return await this.brandService.findAll();
  }

  @Get('by-id/:id')
  async findBrandById(@Param('id') id: string) {
    return await this.brandService.findById(id);
  }

  @Get('by-name/:name')
  async findBrandByName(@Param('name') name: string) {
    return await this.brandService.findByName(name);
  }

  @Post('create')
  async createBrand(@Body() createBrandDto: CreateBrandDto) {
    return await this.brandService.create(createBrandDto);
  }

  @Patch('update/:id')
  async updateBrand(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.update(id, updateBrandDto);
  }

  @Delete('delete/:id')
  async deleteBrand(@Param('id') id: string) {
    return this.brandService.delete(id);
  }
}
