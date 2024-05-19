// import { PartialType } from '@nestjs/mapped-types';
// import { CreateCustomerDto } from './create-customer.dto';

// export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
//     id: number
// }

export class UpdateCustomerDto {
    id: number
    firstName: string
    lastName: string   
}
