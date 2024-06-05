import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseServiceDto } from "src/core/application/dtos/service/response-service.dto";
import { ResponseServiceMapper } from "src/core/domain/mapping/services/response-service.mapper";
import { ServiceRepository } from "src/core/infrastructure/Repositories/service/service.repository";
import { messages } from "src/core/infrastructure/Shared/messages";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetOneServiceQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetOneServiceQuery)
export class GetOneServiceHandler implements IQueryHandler<GetOneServiceQuery, Result<ResponseServiceDto>> {
  private responseMapper: ResponseServiceMapper
  constructor ( private readonly repository: ServiceRepository) {
    this.responseMapper = new ResponseServiceMapper()
  }
  
  
  async execute(query: GetOneServiceQuery): Promise<Result<ResponseServiceDto>> {
    const register = await this.repository.getById(query.id);

    if (!register)
      throw new NotFoundException(messages.SERVICE_NOT_FOUND(query.id))

    const responseData = this.responseMapper.mapTo(register);

    return result(responseData).Success();
  }
  
}
