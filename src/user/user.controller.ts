import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users/v1')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
  
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(@Req() req: Request) {
  
    return this.userService.getUsers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') userId: string, @Req() req: Request) {
  
    return this.userService.getUserById(userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
  
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeUser(@Param('id') userId: string, @Req() req: Request) {
  
    await this.userService.removeUser(userId);
    return { message: 'User successfully deleted' };
  }
}