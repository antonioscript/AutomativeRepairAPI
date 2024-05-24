import { PartialType } from '@nestjs/mapped-types';
import { RequestCustomerDto } from './request-customer.dto';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateCustomerDto extends PartialType(RequestCustomerDto) {
    @ApiProperty()
    id: number;
}
