import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { R2Service } from '../r2/r2.service';
import { Task } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService, private r2Service: R2Service) {}

  async createTask(userId: number, createTaskDto: any, file: Express.Multer.File) {
    let photoUrl = null;
    if (file) {
      photoUrl = await this.r2Service.uploadFile(file);
    }

    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        photo: photoUrl,
        userId,
      },
    });
  }

  async getTasks(userId: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async getTasksByCategory(categoryId: string, sortByPriority: boolean = false): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: { categoryId },
      orderBy: sortByPriority ? { priority: 'asc' } : undefined,
    });
  }

  async updateTask(taskId: string, userId: string, updateTaskDto: any, file?: Express.Multer.File) {
    let photoUrl = updateTaskDto.photo;

    if (file) {
      photoUrl = await this.r2Service.uploadFile(file);
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: {
        ...updateTaskDto,
        photo: photoUrl,
        updatedBy: userId,
      },
    });
  }

  async removeTask(taskId: string, userId: string): Promise<void> {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task || task.userId !== userId) {
      throw new NotFoundException('Task not found or access denied');
    }

    await this.prisma.task.delete({
      where: { id: taskId },
    });
  }

  async getStatusOverview(categoryId: string): Promise<any> {
    const tasks = await this.prisma.task.findMany({
      where: { categoryId },
    });

    const overview = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});

    return overview;
  }
}