import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseCustomerDto } from "src/core/application/dtos/customer/response-customer.dto";
import { ResponseCustomerMapper } from "src/core/domain/mapping/customer/response-customer.mapper";
import { CustomerRepository } from "src/core/infrastructure/Repositories/customer/customer.repository";
import { messages } from "src/core/infrastructure/Shared/messages";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetOneCustomerQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetOneCustomerQuery)
export class GetOneCustomerHandler implements IQueryHandler<GetOneCustomerQuery, Result<ResponseCustomerDto>> {
  private responseMapper: ResponseCustomerMapper
  constructor ( private readonly repository: CustomerRepository) {
    this.responseMapper = new ResponseCustomerMapper()
  }
  
  
  async execute(query: GetOneCustomerQuery): Promise<Result<ResponseCustomerDto>> {
    const register = await this.repository.getById(query.id);

    if (!register)
      throw new NotFoundException(messages.CUSTOMER_NOT_FOUND(query.id))

    const responseData = this.responseMapper.mapTo(register);

    return result(responseData).Success();
  }
  
}
