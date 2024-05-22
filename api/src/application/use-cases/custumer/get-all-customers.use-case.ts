import { UseCase } from "../use-case";
import { ResponseCustomerDto } from "src/application/dtos/customer/response-customer.dto";
import { ResponseCustomerMapper } from "src/domain/mapping/customer/response-customer.mapper";
import { CustomerRepository } from "src/infrastructure/Repositories/customer.repository";

export class GetAllCustomersUseCase implements UseCase<ResponseCustomerDto[]> {
  private responseCustomerMapper: ResponseCustomerMapper

  constructor(private readonly repository: CustomerRepository) {
    this.responseCustomerMapper = new ResponseCustomerMapper()
  }

  public async execute(): Promise<ResponseCustomerDto[]> {
    const customers = await this.repository.getAll();
    return customers.map(customer => this.responseCustomerMapper.mapTo(customer))
  }
}
