import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseVehicleDto } from "src/core/application/dtos/vehicle/response-vehicle.dto";
import { ResponseVehicleMapper } from "src/core/domain/mapping/vehicle/response-vehicle.mapper";
import { VehicleRepository } from "src/core/infrastructure/Repositories/vehicle/vehicle.repository";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetAllVehiclesQuery {

}

@QueryHandler(GetAllVehiclesQuery)
export class GetAllVehiclesHandler implements IQueryHandler<GetAllVehiclesQuery, Result<ResponseVehicleDto[]>> {
  private responseMapper: ResponseVehicleMapper
  constructor ( private readonly repository: VehicleRepository) {
    this.responseMapper = new ResponseVehicleMapper()
  }
  
  
  async execute(query: GetAllVehiclesQuery): Promise<Result<ResponseVehicleDto[]>> {
    const registers = await this.repository.getAll();
    const responseData =  registers.map(Vehicle => this.responseMapper.mapTo(Vehicle))

    return result(responseData).Success();
  }
  
}
