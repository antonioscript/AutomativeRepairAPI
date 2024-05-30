import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseVehicleTypeDto } from "src/core/application/dtos/vehicleType/response-vehicleType.dto";
import { ResponseVehicleTypeMapper } from "src/core/domain/mapping/vehicleType/response-vehicleType.mapper";
import { VehicleTypeRepository } from "src/core/infrastructure/Repositories/vehicleType/vehicleType.repository";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetAllVehicleTypesQuery {

}

@QueryHandler(GetAllVehicleTypesQuery)
export class GetAllVehicleTypesHandler implements IQueryHandler<GetAllVehicleTypesQuery, Result<ResponseVehicleTypeDto[]>> {
  private responseMapper: ResponseVehicleTypeMapper
  constructor ( private readonly repository: VehicleTypeRepository) {
    this.responseMapper = new ResponseVehicleTypeMapper()
  }
  
  
  async execute(query: GetAllVehicleTypesQuery): Promise<Result<ResponseVehicleTypeDto[]>> {
    const registers = await this.repository.getAll();
    const responseData =  registers.map(VehicleType => this.responseMapper.mapTo(VehicleType))

    return result(responseData).Success();
  }
  
}
