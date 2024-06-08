import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseInspectionDto } from "src/core/application/dtos/inspection/response-inspection.dto";
import { ResponseInspectionMapper } from "src/core/domain/mapping/inspection/response-inspection.mapper";
import { InspectionRepository } from "src/core/infrastructure/Repositories/inspection/inspection.repository";
import { constants } from "src/core/infrastructure/Shared/constants";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetPagedInspectionsQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number
  ) {}
}


@QueryHandler(GetPagedInspectionsQuery)
export class GetPagedInspectionsHandler implements IQueryHandler<GetPagedInspectionsQuery, Result<ResponseInspectionDto[]>> {
  private responseMapper: ResponseInspectionMapper;
  constructor(private readonly repository: InspectionRepository) {
    this.responseMapper = new ResponseInspectionMapper();
  }

  async execute(query: GetPagedInspectionsQuery): Promise<Result<ResponseInspectionDto[]>> {
    
    let { page, pageSize } = query;
    
    if (isNaN(page)) {
      page = constants.PAGE_DEFAULT;
    }
    if (isNaN(pageSize)) {
      pageSize = constants.PAGE_SIZE_DEFAULT;
    }

    const { data, total, lastPage, currentPage, perPage, prev, next } = await this.repository.getPaginated(page, pageSize);

    const filteredData = data.filter(entity => !entity.isServiceOrder);

    const responseData = filteredData.map(entity => this.responseMapper.mapTo(entity));
  
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
