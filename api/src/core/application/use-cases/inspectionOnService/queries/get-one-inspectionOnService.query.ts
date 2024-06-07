import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseInspectionOnServiceDto } from "src/core/application/dtos/inspectionOnService/response-InspectionOnService.dto";
import { ResponseInspectionOnServiceMapper } from "src/core/domain/mapping/inspectionOnService/response-inspectionOnService.mapper";
import { InspectionOnServiceRepository } from "src/core/infrastructure/Repositories/inpectionOnService/inspectionOnService.repository";
import { messages } from "src/core/infrastructure/Shared/messages";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetOneInspectionOnServiceQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetOneInspectionOnServiceQuery)
export class GetOneInspectionOnServiceHandler implements IQueryHandler<GetOneInspectionOnServiceQuery, Result<ResponseInspectionOnServiceDto>> {
  private responseMapper: ResponseInspectionOnServiceMapper
  constructor ( private readonly repository: InspectionOnServiceRepository) {
    this.responseMapper = new ResponseInspectionOnServiceMapper()
  }
  
  
  async execute(query: GetOneInspectionOnServiceQuery): Promise<Result<ResponseInspectionOnServiceDto>> {
    const register = await this.repository.getById(query.id);

    if (!register)
      throw new NotFoundException(messages.PART_NOT_FOUND(query.id))

    const responseData = this.responseMapper.mapTo(register);

    return result(responseData).Success();
  }
  
}
