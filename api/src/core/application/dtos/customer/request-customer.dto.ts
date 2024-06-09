import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Matches } from 'class-validator';
import { constants } from 'src/core/infrastructure/Shared/constants';
import { messages } from 'src/core/infrastructure/Shared/messages';
export class RequestCustomerDto {

    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    lastName: string   

    @ApiProperty({ required: true })
    @IsString()
    @Matches(constants.REGEX_CPF, { message: messages.CPF_TYPE})
    cpf: string 
}
