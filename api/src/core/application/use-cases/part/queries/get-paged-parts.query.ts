import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponsePartDto } from "src/core/application/dtos/part/response-part.dto";
import { ResponsePartMapper } from "src/core/domain/mapping/part/response-part.mapper";
import { PartRepository } from "src/core/infrastructure/Repositories/part/part.repository";
import { constants } from "src/core/infrastructure/Shared/constants";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetPagedPartsQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number
  ) {}
}


@QueryHandler(GetPagedPartsQuery)
export class GetPagedPartsHandler implements IQueryHandler<GetPagedPartsQuery, Result<ResponsePartDto[]>> {
  private responseMapper: ResponsePartMapper;
  constructor(private readonly repository: PartRepository) {
    this.responseMapper = new ResponsePartMapper();
  }

  async execute(query: GetPagedPartsQuery): Promise<Result<ResponsePartDto[]>> {
    
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
