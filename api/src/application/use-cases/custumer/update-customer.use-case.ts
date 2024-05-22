import { UseCase } from "../use-case"
import { ResponseCustomerDto } from "src/application/dtos/customer/response-customer.dto"
import { UpdateCustomerMapper } from "src/domain/mapping/customer/update-customer.mapper"
import { ResponseCustomerMapper } from "src/domain/mapping/customer/response-customer.mapper"
import { CustomerRepository } from "src/infrastructure/Repositories/customer.repository"
import { UpdateCustomerDto } from "src/application/dtos/customer/update-customer.dto"


export class UpdateCustomerUseCase implements UseCase<ResponseCustomerDto> {
  private updateCustomerMapper: UpdateCustomerMapper
  private responseCustomerMapper: ResponseCustomerMapper

  constructor(private readonly repository: CustomerRepository) {
    this.updateCustomerMapper = new UpdateCustomerMapper()
    this.responseCustomerMapper = new ResponseCustomerMapper()
  }

  public async execute(id: number, customer: UpdateCustomerDto): Promise<ResponseCustomerDto> {
    const entity = this.updateCustomerMapper.mapFrom(customer)
    const responseCustomer = await this.repository.update(id, entity)
    return this.responseCustomerMapper.mapTo(responseCustomer)
  }
}
