import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword, MinLength } from "class-validator";

export class AuthLoginDto {

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    // @IsStrongPassword()
    // @MinLength(6)
    password: string
}