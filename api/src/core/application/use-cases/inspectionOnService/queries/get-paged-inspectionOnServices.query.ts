import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseInspectionOnServiceDto } from "src/core/application/dtos/inspectionOnService/response-InspectionOnService.dto";
import { ResponseInspectionOnServiceMapper } from "src/core/domain/mapping/inspectionOnService/response-inspectionOnService.mapper";
import { InspectionOnServiceRepository } from "src/core/infrastructure/Repositories/inpectionOnService/inspectionOnService.repository";
import { constants } from "src/core/infrastructure/Shared/constants";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetPagedInspectionOnServicesQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number
  ) {}
}


@QueryHandler(GetPagedInspectionOnServicesQuery)
export class GetPagedInspectionOnServicesHandler implements IQueryHandler<GetPagedInspectionOnServicesQuery, Result<ResponseInspectionOnServiceDto[]>> {
  private responseMapper: ResponseInspectionOnServiceMapper;
  constructor(private readonly repository: InspectionOnServiceRepository) {
    this.responseMapper = new ResponseInspectionOnServiceMapper();
  }

  async execute(query: GetPagedInspectionOnServicesQuery): Promise<Result<ResponseInspectionOnServiceDto[]>> {
    
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
