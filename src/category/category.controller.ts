import { Controller, Post, Get, Body, Param, Patch, UseGuards, Req, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories/v1')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async getCategories() {
    return this.categoryService.getCategories();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateCategory(
    @Param('id') categoryId: string, userId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req: Request,
  ) {
    const updatedCategory = await this.categoryService.updateCategory(categoryId, updateCategoryDto, userId);
    return updatedCategory;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeCategory(@Param('id') categoryId: string, userId: string, @Req() req: Request) {
    await this.categoryService.removeCategory(categoryId, userId);
    return { message: 'Category successfully deleted' };
  }
}