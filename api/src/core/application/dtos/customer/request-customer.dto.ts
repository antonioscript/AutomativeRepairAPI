import { ApiProperty } from '@nestjs/swagger';

export class RequestCustomerDto {
    @ApiProperty({ required: false })
    id?: number

    @ApiProperty()
    firstName: string

    @ApiProperty()
    lastName: string   
}
