import { Controller, Post, Get, Body, Param, UseGuards, UploadedFile, UseInterceptors, Delete, Req, Patch, UnauthorizedException, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateTaskDto } from './dto/update-task.dto';
import { request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tasks/v1')
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async createTask(@Body() createTaskDto: CreateTaskDto, @UploadedFile() file: Express.Multer.File) {
    return this.taskService.createTask(1, createTaskDto, file);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getTasks(@Param(":id") userId: string, @Req() req: Request) {
    return this.taskService.getTasks(userId);
  }

  @Get('/category/:categoryId')
  @UseGuards(JwtAuthGuard)
  async getTasksByCategory(
    @Param('categoryId') categoryId: string, userId: string,
    @Query('sortByPriority') sortByPriority: string,
    @Req() req: Request,
  ) {
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    const sort = sortByPriority === 'true';
    return this.taskService.getTasksByCategory(categoryId, sort);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Param('id') taskId: string, userId: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const updatedTask = await this.taskService.updateTask(taskId, userId, updateTaskDto, file);
    return updatedTask;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeTask(@Param('id') taskId: string, userId: string, @Req() req: Request) {
    await this.taskService.removeTask(taskId, userId);
    return { message: 'Task successfully deleted' };
  }

  @Get('status-overview/:categoryId')
  @UseGuards(JwtAuthGuard)
  async getStatusOverview(
    @Param('categoryId') categoryId: string, userId: string,
    @Req() req: Request,
  ) {
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.taskService.getStatusOverview(categoryId);
  }
}