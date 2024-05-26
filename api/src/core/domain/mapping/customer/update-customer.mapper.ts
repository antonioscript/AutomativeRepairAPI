import { Mapper } from "../mapper"
import { UpdateCustomerDto } from "src/core/application/dtos/customer/update-customer.dto"
import { CustomerEntity } from "src/core/domain/entities/customer.entity"

export class UpdateCustomerMapper extends Mapper<UpdateCustomerDto, CustomerEntity> {
  public mapFrom(data: UpdateCustomerDto): CustomerEntity {
    const customer = new CustomerEntity()

    customer.id = data.id // TODO: Verificar
    customer.firstName = data.firstName
    customer.lastName = data.lastName
    customer.cpf = data.cpf

    return customer
  }

  public mapTo(data: CustomerEntity): UpdateCustomerDto {
    const customer = new UpdateCustomerDto()

    customer.id = data.id
    customer.firstName = data.firstName
    customer.lastName = data.lastName
    customer.cpf = data.cpf

    return customer
  }
}
