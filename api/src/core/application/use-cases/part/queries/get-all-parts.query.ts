import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponsePartDto } from "src/core/application/dtos/part/response-part.dto";
import { ResponsePartMapper } from "src/core/domain/mapping/part/response-part.mapper";
import { PartRepository } from "src/core/infrastructure/Repositories/part/part.repository";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetAllPartsQuery {

}

@QueryHandler(GetAllPartsQuery)
export class GetAllPartsHandler implements IQueryHandler<GetAllPartsQuery, Result<ResponsePartDto[]>> {
  private responseMapper: ResponsePartMapper
  constructor ( private readonly repository: PartRepository) {
    this.responseMapper = new ResponsePartMapper()
  }
  
  
  async execute(query: GetAllPartsQuery): Promise<Result<ResponsePartDto[]>> {
    const registers = await this.repository.getAll();
    const responseData =  registers.map(entity => this.responseMapper.mapTo(entity))

    return result(responseData).Success();
  }
  
}
