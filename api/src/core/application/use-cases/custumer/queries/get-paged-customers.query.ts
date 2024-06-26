import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseCustomerDto } from "src/core/application/dtos/customer/response-customer.dto";
import { ResponseCustomerMapper } from "src/core/domain/mapping/customer/response-customer.mapper";
import { CustomerRepository } from "src/core/infrastructure/Repositories/customer/customer.repository";
import { constants } from "src/core/infrastructure/Shared/constants";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetPagedCustomersQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number
  ) {}
}


@QueryHandler(GetPagedCustomersQuery)
export class GetPagedCustomersHandler implements IQueryHandler<GetPagedCustomersQuery, Result<ResponseCustomerDto[]>> {
  private responseMapper: ResponseCustomerMapper;
  constructor(private readonly repository: CustomerRepository) {
    this.responseMapper = new ResponseCustomerMapper();
  }

  async execute(query: GetPagedCustomersQuery): Promise<Result<ResponseCustomerDto[]>> {
    
    let { page, pageSize } = query;
    
    if (isNaN(page)) {
      page = constants.PAGE_DEFAULT;
    }
    if (isNaN(pageSize)) {
      pageSize = constants.PAGE_SIZE_DEFAULT;
    }

    const { data, total, lastPage, currentPage, perPage, prev, next } = await this.repository.getPaginated(page, pageSize);
  
    const responseData = data.map(entity => this.responseMapper.mapTo(entity));
  
    const pagination = {
      total,
      lastPage,
      currentPage,
      perPage,
      prev,
      next,
    };
  
    return result(responseData).PaginationSuccess(pagination); 
  }
  
}
