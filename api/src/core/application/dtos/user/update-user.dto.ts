import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, IsStrongPassword } from 'class-validator';

export class UpdateUserDto{
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    name: string

    @IsEmail()
    @ApiProperty()
    email: string
}
