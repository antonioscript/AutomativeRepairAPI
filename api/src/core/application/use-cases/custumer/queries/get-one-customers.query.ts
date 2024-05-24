import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseCustomerDto } from "src/core/application/dtos/customer/response-customer.dto";
import { ResponseCustomerMapper } from "src/core/domain/mapping/customer/response-customer.mapper";
import { CustomerRepository } from "src/core/infrastructure/Repositories/customer.repository";

export class GetOneCustomerQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetOneCustomerQuery)
export class GetOneCustomersHandler implements IQueryHandler<GetOneCustomerQuery, ResponseCustomerDto> {
  private responseCustomerMapper: ResponseCustomerMapper
  constructor ( private readonly repository: CustomerRepository) {
    this.responseCustomerMapper = new ResponseCustomerMapper()
  }
  
  
  async execute(query: GetOneCustomerQuery): Promise<ResponseCustomerDto> {
    const register = await this.repository.getById(query.id);
    return this.responseCustomerMapper.mapTo(register);
  }
  
}
