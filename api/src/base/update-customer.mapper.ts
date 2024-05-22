import { RequestCustomerDto } from "src/customers/dto/request-customer.dto"
import { CustomerEntity } from "src/customers/entities/customer.entity"
import { Mapper } from "./mapper"
import { UpdateCustomerDto } from "src/customers/dto/update-customer.dto"


export class UpdateCustomerMapper extends Mapper<UpdateCustomerDto, CustomerEntity> {
  public mapFrom(data: UpdateCustomerDto): CustomerEntity {
    const customer = new CustomerEntity()

    customer.id = data.id // TODO: Verificar
    customer.firstName = data.firstName
    customer.lastName = data.lastName

    return customer
  }

  public mapTo(data: CustomerEntity): UpdateCustomerDto {
    const customer = new UpdateCustomerDto()

    customer.id = data.id
    customer.firstName = data.firstName
    customer.lastName = data.lastName

    return customer
  }
}
