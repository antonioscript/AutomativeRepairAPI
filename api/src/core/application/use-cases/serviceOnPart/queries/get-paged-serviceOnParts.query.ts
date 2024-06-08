import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseServiceOnPartDto } from "src/core/application/dtos/serviceOnPart/response-serviceOnPart.dto";
import { ResponseServiceOnPartMapper } from "src/core/domain/mapping/serviceOnPart/response-serviceOnPart.mapper";
import { ServiceOnPartRepository } from "src/core/infrastructure/Repositories/serviceOnPart/serviceOnPart.repository";
import { constants } from "src/core/infrastructure/Shared/constants";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetPagedServiceOnPartsQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number
  ) {}
}


@QueryHandler(GetPagedServiceOnPartsQuery)
export class GetPagedServiceOnPartsHandler implements IQueryHandler<GetPagedServiceOnPartsQuery, Result<ResponseServiceOnPartDto[]>> {
  private responseMapper: ResponseServiceOnPartMapper;
  constructor(private readonly repository: ServiceOnPartRepository) {
    this.responseMapper = new ResponseServiceOnPartMapper();
  }

  async execute(query: GetPagedServiceOnPartsQuery): Promise<Result<ResponseServiceOnPartDto[]>> {
    
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
