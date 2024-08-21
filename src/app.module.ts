import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { R2Module } from './r2/r2.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    TaskModule,
    CategoryModule,
    AuthModule,
    R2Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}