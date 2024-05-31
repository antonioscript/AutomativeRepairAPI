import { ApiProperty } from "@nestjs/swagger";
import { IsEmail} from "class-validator";

export class AuthForgetDto {

    @ApiProperty()
    @IsEmail()
    email: string;
}