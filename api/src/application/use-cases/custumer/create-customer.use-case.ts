import { UseCase } from "../use-case"
import { ResponseCustomerDto } from "src/application/dtos/customer/response-customer.dto"
import { RequestCustomerDto } from "src/application/dtos/customer/request-customer.dto"
import { RequestCustomerMapper } from "src/domain/mapping/customer/request-customer.mapper"
import { ResponseCustomerMapper } from "src/domain/mapping/customer/response-customer.mapper"
import { CustomerRepository } from "src/infrastructure/Repositories/customer.repository"

export class CreateCustomerUseCase implements UseCase<ResponseCustomerDto> {
  private requestCustomerMapper: RequestCustomerMapper
  private responseCustomerMapper: ResponseCustomerMapper

  constructor(private readonly repository: CustomerRepository) {
    this.requestCustomerMapper = new RequestCustomerMapper()
    this.responseCustomerMapper = new ResponseCustomerMapper()
  }

  public async execute(customer: RequestCustomerDto): Promise<ResponseCustomerDto> {
    const entity = this.requestCustomerMapper.mapFrom(customer)
    const responseCustomer = await this.repository.create(entity)
    return this.responseCustomerMapper.mapTo(responseCustomer)
  }
}
