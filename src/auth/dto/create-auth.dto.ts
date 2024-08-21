import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: "sulton98" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: "sultonboybekchanov@gmail.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "123456" })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class LoginUserDto {
  @ApiProperty({ example: "sultonboybekchanov@gmail.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "123456" })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}