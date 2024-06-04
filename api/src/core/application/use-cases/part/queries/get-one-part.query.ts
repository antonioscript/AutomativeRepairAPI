import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponsePartDto } from "src/core/application/dtos/part/response-part.dto";
import { ResponsePartMapper } from "src/core/domain/mapping/part/response-part.mapper";
import { PartRepository } from "src/core/infrastructure/Repositories/part/part.repository";
import { messages } from "src/core/infrastructure/Shared/messages";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetOnePartQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetOnePartQuery)
export class GetOnePartHandler implements IQueryHandler<GetOnePartQuery, Result<ResponsePartDto>> {
  private responseMapper: ResponsePartMapper
  constructor ( private readonly repository: PartRepository) {
    this.responseMapper = new ResponsePartMapper()
  }
  
  
  async execute(query: GetOnePartQuery): Promise<Result<ResponsePartDto>> {
    const register = await this.repository.getById(query.id);

    if (!register)
      throw new NotFoundException(messages.PART_NOT_FOUND(query.id))

    const responseData = this.responseMapper.mapTo(register);

    return result(responseData).Success();
  }
  
}
