import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { R2Module } from '../r2/r2.module';

@Module({
  imports: [PrismaModule, R2Module],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}