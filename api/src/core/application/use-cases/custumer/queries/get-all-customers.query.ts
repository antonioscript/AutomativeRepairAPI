import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseCustomerDto } from "src/core/application/dtos/customer/response-customer.dto";
import { ResponseCustomerMapper } from "src/core/domain/mapping/customer/response-customer.mapper";
import { CustomerRepository } from "src/core/infrastructure/Repositories/customer/customer.repository";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetAllCustomersQuery {
  constructor(
    public readonly page: number = 1,
    public readonly pageSize: number = 10
  ) {}
}


@QueryHandler(GetAllCustomersQuery)
export class GetAllCustomersHandler implements IQueryHandler<GetAllCustomersQuery, Result<ResponseCustomerDto[]>> {
  private responseMapper: ResponseCustomerMapper;
  constructor(private readonly repository: CustomerRepository) {
    this.responseMapper = new ResponseCustomerMapper();
  }

  async execute(query: GetAllCustomersQuery): Promise<Result<ResponseCustomerDto[]>> {
    const { page, pageSize } = query;
    const { data, total, lastPage, currentPage, perPage, prev, next } = await this.repository.getPagination(page, pageSize);
  
    const responseData = data.map(customer => this.responseMapper.mapTo(customer));
  
    const pagination = {
      total,
      lastPage,
      currentPage,
      perPage,
      prev,
      next,
    };
  
    return result(responseData).PaginationSuccess(pagination); // Usando PaginationSuccess para incluir as informações de paginação
  }
  
  
  
  
}
