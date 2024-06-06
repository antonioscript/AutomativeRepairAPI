import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseInspectionOnServiceDto } from "src/core/application/dtos/inspectionOnService/response-InspectionOnService.dto";
import { ResponseInspectionOnServiceMapper } from "src/core/domain/mapping/inspectionOnService/response-inspectionOnService.mapper";
import { InspectionOnServiceRepository } from "src/core/infrastructure/Repositories/inpectionOnService/inspectionOnService.repository";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetAllInspectionOnServicesQuery {

}

@QueryHandler(GetAllInspectionOnServicesQuery)
export class GetAllInspectionOnServicesHandler implements IQueryHandler<GetAllInspectionOnServicesQuery, Result<ResponseInspectionOnServiceDto[]>> {
  private responseMapper: ResponseInspectionOnServiceMapper
  constructor ( private readonly repository: InspectionOnServiceRepository) {
    this.responseMapper = new ResponseInspectionOnServiceMapper()
  }
  
  
  async execute(query: GetAllInspectionOnServicesQuery): Promise<Result<ResponseInspectionOnServiceDto[]>> {
    const registers = await this.repository.getAll();
    const responseData =  registers.map(entity => this.responseMapper.mapTo(entity))

    return result(responseData).Success();
  }
  
}
