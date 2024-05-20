import { CreateCustomerDto } from "src/customers/dto/create-customer.dto"
import { CustomerEntity } from "src/customers/entities/customer.entity"
import { Mapper } from "./mapper"
import { CreatedCustomerDto } from "src/customers/dto/created-customer.dto"


export class CreatedCustomerMapper extends Mapper<CreatedCustomerDto, CustomerEntity> {
  public mapFrom(data: CreatedCustomerDto): CustomerEntity {
    const customer = new CustomerEntity()

    customer.id = data.id
    customer.firstName = data.firstName
    customer.lastName = data.lastName

    return customer
  }

  public mapTo(data: CustomerEntity): CreatedCustomerDto {
    const customer = new CreatedCustomerDto()

    customer.id = data.id
    customer.firstName = data.firstName
    customer.lastName = data.lastName

    return customer
  }
}
