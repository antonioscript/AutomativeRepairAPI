import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseCustomerDto } from "src/core/application/dtos/customer/response-customer.dto";
import { ResponseCustomerMapper } from "src/core/domain/mapping/customer/response-customer.mapper";
import { CustomerRepository } from "src/core/infrastructure/Repositories/customer.repository";

export class GetAllCustomersQuery {

}

@QueryHandler(GetAllCustomersQuery)
export class GetAllCustomersHandler implements IQueryHandler<GetAllCustomersQuery, ResponseCustomerDto[]> {
  private responseCustomerMapper: ResponseCustomerMapper
  constructor ( private readonly repository: CustomerRepository) {
    this.responseCustomerMapper = new ResponseCustomerMapper()
  }
  
  
  async execute(query: GetAllCustomersQuery): Promise<ResponseCustomerDto[]> {
    const customers = await this.repository.getAll();
    return customers.map(customer => this.responseCustomerMapper.mapTo(customer))
  }
  
}