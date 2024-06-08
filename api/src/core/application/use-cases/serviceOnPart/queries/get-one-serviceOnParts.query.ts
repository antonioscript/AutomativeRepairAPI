import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseServiceOnPartDto } from "src/core/application/dtos/serviceOnPart/response-serviceOnPart.dto";
import { ResponseServiceOnPartMapper } from "src/core/domain/mapping/serviceOnPart/response-serviceOnPart.mapper";
import { ServiceOnPartRepository } from "src/core/infrastructure/Repositories/serviceOnPart/serviceOnPart.repository";
import { messages } from "src/core/infrastructure/Shared/messages";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetOneServiceOnPartQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetOneServiceOnPartQuery)
export class GetOneServiceOnPartHandler implements IQueryHandler<GetOneServiceOnPartQuery, Result<ResponseServiceOnPartDto>> {
  private responseMapper: ResponseServiceOnPartMapper
  constructor ( private readonly repository: ServiceOnPartRepository) {
    this.responseMapper = new ResponseServiceOnPartMapper()
  }
  
  
  async execute(query: GetOneServiceOnPartQuery): Promise<Result<ResponseServiceOnPartDto>> {
    const register = await this.repository.getById(query.id);

    if (!register)
      throw new NotFoundException(messages.PART_NOT_FOUND(query.id))

    const responseData = this.responseMapper.mapTo(register);

    return result(responseData).Success();
  }
  
}
