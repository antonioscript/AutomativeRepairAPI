import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseCustomerDto } from "src/core/application/dtos/customer/response-customer.dto";
import { ResponseCustomerMapper } from "src/core/domain/mapping/customer/response-customer.mapper";
import { CustomerRepository } from "src/core/infrastructure/Repositories/customer/customer.repository";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetAllCustomersQuery {

}

@QueryHandler(GetAllCustomersQuery)
export class GetAllCustomersHandler implements IQueryHandler<GetAllCustomersQuery, Result<ResponseCustomerDto[]>> {
  private responseMapper: ResponseCustomerMapper
  constructor ( private readonly repository: CustomerRepository) {
    this.responseMapper = new ResponseCustomerMapper()
  }
  
  
  async execute(query: GetAllCustomersQuery): Promise<Result<ResponseCustomerDto[]>> {
    const registers = await this.repository.getAll();
    const responseData =  registers.map(entity => this.responseMapper.mapTo(entity))

    return result(responseData).Success();
  }
  
}
