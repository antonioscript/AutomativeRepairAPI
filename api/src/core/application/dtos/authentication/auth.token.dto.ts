import { ApiProperty } from "@nestjs/swagger";
import { IsJWT} from "class-validator";

export class AuthTokenDto {

    @ApiProperty()
    @IsJWT()
    token: string
}