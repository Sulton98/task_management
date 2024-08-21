import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Category } from '@prisma/client';
import { UpdateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(createCategoryDto: any) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async getCategories(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async updateCategory(
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto,
    userId: string
  ): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category || category.userId !== userId) {
      throw new NotFoundException('Category not found or access denied');
    }

    return this.prisma.category.update({
      where: { id: categoryId },
      data: updateCategoryDto,
    });
  }

    async removeCategory(categoryId: string, userId: string): Promise<void> {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category || category.userId !== userId) {
      throw new NotFoundException('Category not found or access denied');
    }

    await this.prisma.category.delete({
      where: { id: categoryId },
    });
  }
}