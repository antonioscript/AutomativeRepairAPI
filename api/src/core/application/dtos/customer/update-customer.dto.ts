import { PartialType } from '@nestjs/mapped-types';
import { RequestCustomerDto } from './request-customer.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
export class UpdateCustomerDto extends PartialType(RequestCustomerDto) {
    @ApiProperty()
    @IsInt()
    id: number;
}
