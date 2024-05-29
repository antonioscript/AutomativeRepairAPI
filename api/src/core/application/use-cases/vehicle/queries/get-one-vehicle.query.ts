import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseVehicleDto } from "src/core/application/dtos/vehicle/response-vehicle.dto";
import { ResponseVehicleMapper } from "src/core/domain/mapping/vehicle/response-vehicle.mapper";
import { VehicleRepository } from "src/core/infrastructure/Repositories/vehicle/vehicle.repository";
import { messages } from "src/core/infrastructure/Shared/messages";
import { Result, result } from "src/core/infrastructure/Shared/result.util";


export class GetOneVehicleQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetOneVehicleQuery)
export class GetOneVehicleHandler implements IQueryHandler<GetOneVehicleQuery, Result<ResponseVehicleDto>> {
  private responseMapper: ResponseVehicleMapper
  constructor ( private readonly repository: VehicleRepository) {
    this.responseMapper = new ResponseVehicleMapper()
  }
  
  
  async execute(query: GetOneVehicleQuery): Promise<Result<ResponseVehicleDto>> {
    const register = await this.repository.getById(query.id);

    if (!register)
      throw new NotFoundException(messages.VEHICLE_NOT_FOUND(query.id))

    const responseData = this.responseMapper.mapTo(register);

    return result(responseData).Success();
  }
  
}
