import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseServiceDto } from "src/core/application/dtos/service/response-service.dto";
import { ResponseServiceMapper } from "src/core/domain/mapping/services/response-service.mapper";
import { ServiceRepository } from "src/core/infrastructure/Repositories/service/service.repository";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetAllServicesQuery {

}

@QueryHandler(GetAllServicesQuery)
export class GetAllServicesHandler implements IQueryHandler<GetAllServicesQuery, Result<ResponseServiceDto[]>> {
  private responseMapper: ResponseServiceMapper
  constructor ( private readonly repository: ServiceRepository) {
    this.responseMapper = new ResponseServiceMapper()
  }
  
  
  async execute(query: GetAllServicesQuery): Promise<Result<ResponseServiceDto[]>> {
    const registers = await this.repository.getAll();
    const responseData =  registers.map(entity => this.responseMapper.mapTo(entity))

    return result(responseData).Success();
  }
  
}
