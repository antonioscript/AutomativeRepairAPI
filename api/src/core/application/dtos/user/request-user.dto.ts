import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsStrongPassword } from 'class-validator';
export class RequestUserDto {

    @ApiProperty()
    @IsString()
    name: string

    @IsEmail()
    @ApiProperty()
    email: string

    @IsStrongPassword({
        minLength: 6
    })
    @ApiProperty()
    password: string
}
