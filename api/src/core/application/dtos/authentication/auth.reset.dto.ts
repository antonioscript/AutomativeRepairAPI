import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsStrongPassword, MinLength} from "class-validator";

export class AuthResetDto {

    @ApiProperty()
    @IsStrongPassword()
    @MinLength(6)
    password: string

    @IsJWT()
    token: string
}