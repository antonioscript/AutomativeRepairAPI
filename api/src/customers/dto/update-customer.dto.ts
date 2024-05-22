import { PartialType } from '@nestjs/mapped-types';
import { RequestCustomerDto } from './request-customer.dto';

export class UpdateCustomerDto extends PartialType(RequestCustomerDto) {
    id: number;
}
