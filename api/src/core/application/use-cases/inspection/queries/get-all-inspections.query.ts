import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseInspectionDto } from "src/core/application/dtos/inspection/response-inspection.dto";
import { ResponseInspectionMapper } from "src/core/domain/mapping/inspection/response-inspection.mapper";
import { InspectionRepository } from "src/core/infrastructure/Repositories/inspection/inspection.repository";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetAllInspectionsQuery {

}

@QueryHandler(GetAllInspectionsQuery)
export class GetAllInspectionsHandler implements IQueryHandler<GetAllInspectionsQuery, Result<ResponseInspectionDto[]>> {
  private responseMapper: ResponseInspectionMapper
  constructor ( private readonly repository: InspectionRepository) {
    this.responseMapper = new ResponseInspectionMapper()
  }
  
  
  async execute(query: GetAllInspectionsQuery): Promise<Result<ResponseInspectionDto[]>> {
    const registers = await this.repository.getAll();

    const onlyRegisterInspection = registers.filter(e => !e.isServiceOrder);
    
    const responseData = onlyRegisterInspection.map(entity => this.responseMapper.mapTo(entity));

    return result(responseData).Success();
  }
  
}
