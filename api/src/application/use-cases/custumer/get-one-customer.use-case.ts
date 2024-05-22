import { UseCase } from "../use-case";
import { ResponseCustomerDto } from "src/application/dtos/customer/response-customer.dto";
import { ResponseCustomerMapper } from "src/domain/mapping/customer/response-customer.mapper";
import { CustomerRepository } from "src/infrastructure/Repositories/customer.repository";

export class GetOneCustomerUseCase implements UseCase<ResponseCustomerDto> {
  private responseCustomerMapper: ResponseCustomerMapper

  constructor(private readonly repository: CustomerRepository) {
    this.responseCustomerMapper = new ResponseCustomerMapper()
  }

  public async execute(id: number): Promise<ResponseCustomerDto> {
    const register = await this.repository.getById(id);
    return this.responseCustomerMapper.mapTo(register);
  }
}
