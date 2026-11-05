import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  async getAllCategories() {
    return await this.categoryService.findAll();
  }

  @Get('by-id/:id')
  async findCategoryById(@Param('id') id: string) {
    return await this.categoryService.findById(id);
  }

  @Get('by-name/:name')
  async findCategoryByName(@Param('name') name: string) {
    return await this.categoryService.findByName(name);
  }

  @Post('create')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Patch('update/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete('delete/:id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
