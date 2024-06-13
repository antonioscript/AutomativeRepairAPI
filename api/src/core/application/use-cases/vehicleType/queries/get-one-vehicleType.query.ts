import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseVehicleTypeDto } from "src/core/application/dtos/vehicleType/response-vehicleType.dto";
import { ResponseVehicleTypeMapper } from "src/core/domain/mapping/vehicleType/response-vehicleType.mapper";
import { VehicleTypeRepository } from "src/core/infrastructure/Repositories/vehicleType/vehicleType.repository";
import { messages } from "src/core/infrastructure/Shared/messages";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetOneVehicleTypeQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetOneVehicleTypeQuery)
export class GetOneVehicleTypeHandler implements IQueryHandler<GetOneVehicleTypeQuery, Result<ResponseVehicleTypeDto>> {
  private responseMapper: ResponseVehicleTypeMapper
  constructor ( private readonly repository: VehicleTypeRepository) {
    this.responseMapper = new ResponseVehicleTypeMapper()
  }
  
  
  async execute(query: GetOneVehicleTypeQuery): Promise<Result<ResponseVehicleTypeDto>> {
    const register = await this.repository.getById(query.id);

    if (!register)
      throw new NotFoundException(messages.VEHICLE_TYPE_NOT_FOUND(query.id))

    const responseData = this.responseMapper.mapTo(register);

    return result(responseData).Success();
  }
  
}
