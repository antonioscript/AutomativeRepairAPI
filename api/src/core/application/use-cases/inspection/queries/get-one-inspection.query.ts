import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseInspectionDto } from "src/core/application/dtos/inspection/response-inspection.dto";
import { ResponseInspectionMapper } from "src/core/domain/mapping/inspection/response-inspection.mapper";
import { InspectionRepository } from "src/core/infrastructure/Repositories/inspection/inspection.repository";
import { messages } from "src/core/infrastructure/Shared/messages";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetOneInspectionQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetOneInspectionQuery)
export class GetOneInspectionHandler implements IQueryHandler<GetOneInspectionQuery, Result<ResponseInspectionDto>> {
  private responseMapper: ResponseInspectionMapper
  constructor ( private readonly repository: InspectionRepository) {
    this.responseMapper = new ResponseInspectionMapper()
  }
  
  
  async execute(query: GetOneInspectionQuery): Promise<Result<ResponseInspectionDto>> {
    const register = await this.repository.getById(query.id);

    if (!register)
      throw new NotFoundException(messages.INSPECTION_NOT_FOUND(query.id))

    if (register.isServiceOrder)
      throw new NotFoundException(messages.INSPECTION_NOT_FOUND(query.id))


    const responseData = this.responseMapper.mapTo(register);

    return result(responseData).Success();
  }
  
}
