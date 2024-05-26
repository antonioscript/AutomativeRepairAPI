import { CustomerEntity } from "src/core/domain/entities/customer.entity"
import { Mapper } from "../mapper"
import { ResponseCustomerDto } from "src/core/application/dtos/customer/response-customer.dto"


export class ResponseCustomerMapper extends Mapper<ResponseCustomerDto, CustomerEntity> {
  public mapFrom(data: ResponseCustomerDto): CustomerEntity {
    const customer = new CustomerEntity()

    customer.id = data.id
    customer.firstName = data.firstName
    customer.lastName = data.lastName
    customer.cpf = data.cpf

    return customer
  }

  public mapTo(data: CustomerEntity): ResponseCustomerDto {
    const customer = new ResponseCustomerDto()

    customer.id = data.id
    customer.firstName = data.firstName
    customer.lastName = data.lastName
    customer.cpf = data.cpf
    
    return customer
  }
}
