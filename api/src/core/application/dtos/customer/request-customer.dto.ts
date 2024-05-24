import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';
export class RequestCustomerDto {
    @ApiProperty({ required: false })
    id?: number

    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    lastName: string   
}
