import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseServiceDto } from "src/core/application/dtos/service/response-service.dto";
import { ResponseServiceMapper } from "src/core/domain/mapping/services/response-service.mapper";
import { ServiceRepository } from "src/core/infrastructure/Repositories/service/service.repository";
import { constants } from "src/core/infrastructure/Shared/constants";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetPagedServicesQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number
  ) {}
}


@QueryHandler(GetPagedServicesQuery)
export class GetPagedServicesHandler implements IQueryHandler<GetPagedServicesQuery, Result<ResponseServiceDto[]>> {
  private responseMapper: ResponseServiceMapper;
  constructor(private readonly repository: ServiceRepository) {
    this.responseMapper = new ResponseServiceMapper();
  }

  async execute(query: GetPagedServicesQuery): Promise<Result<ResponseServiceDto[]>> {
    
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
