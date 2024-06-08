import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseServiceOnPartDto } from "src/core/application/dtos/serviceOnPart/response-serviceOnPart.dto";
import { ResponseServiceOnPartMapper } from "src/core/domain/mapping/serviceOnPart/response-serviceOnPart.mapper";
import { ServiceOnPartRepository } from "src/core/infrastructure/Repositories/serviceOnPart/serviceOnPart.repository";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetAllServiceOnPartsQuery {

}

@QueryHandler(GetAllServiceOnPartsQuery)
export class GetAllServiceOnPartsHandler implements IQueryHandler<GetAllServiceOnPartsQuery, Result<ResponseServiceOnPartDto[]>> {
  private responseMapper: ResponseServiceOnPartMapper
  constructor ( private readonly repository: ServiceOnPartRepository) {
    this.responseMapper = new ResponseServiceOnPartMapper()
  }
  
  
  async execute(query: GetAllServiceOnPartsQuery): Promise<Result<ResponseServiceOnPartDto[]>> {
    const registers = await this.repository.getAll();
    const responseData =  registers.map(entity => this.responseMapper.mapTo(entity))

    return result(responseData).Success();
  }
  
}
