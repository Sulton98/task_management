import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: "To make todolist" })
  @IsString()
  name: string;

  @ApiProperty({ example: "72d0a234-ff32-4719-9f89-92def65e7bc1"})
  @IsString()
  userId: string;
}

export class GetCategoryDto {
    @IsString()
    @IsNotEmpty()
    id: string;
}

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;
}

export class RemoveCategoryDto {
    @IsString()
    @IsNotEmpty()
    id: string;
}