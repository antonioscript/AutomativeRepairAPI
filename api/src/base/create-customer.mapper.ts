import { CreateCustomerDto } from "src/customers/dto/create-customer.dto"
import { CustomerEntity } from "src/customers/entities/customer.entity"
import { Mapper } from "./mapper"


export class CreateCustomerMapper extends Mapper<CreateCustomerDto, CustomerEntity> {
  public mapFrom(data: CreateCustomerDto): CustomerEntity {
    const customer = new CustomerEntity()

    customer.firstName = data.firstName
    customer.lastName = data.lastName

    return customer
  }

  public mapTo(data: CustomerEntity): CreateCustomerDto {
    const customer = new CreateCustomerDto()

    customer.id = data.id
    customer.firstName = data.firstName
    customer.lastName = data.lastName

    return customer
  }
}
