import { RequestCustomerDto } from "src/customers/dto/request-customer.dto"
import { CustomerEntity } from "src/customers/entities/customer.entity"
import { Mapper } from "./mapper"


export class RequestCustomerMapper extends Mapper<RequestCustomerDto, CustomerEntity> {
  public mapFrom(data: RequestCustomerDto): CustomerEntity {
    const customer = new CustomerEntity()

    customer.firstName = data.firstName
    customer.lastName = data.lastName

    return customer
  }

  public mapTo(data: CustomerEntity): RequestCustomerDto {
    const customer = new RequestCustomerDto()

    customer.id = data.id
    customer.firstName = data.firstName
    customer.lastName = data.lastName

    return customer
  }
}
