import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseVehicleTypeDto } from "src/core/application/dtos/VehicleType/response-VehicleType.dto";
import { ResponseVehicleTypeMapper } from "src/core/domain/mapping/VehicleType/response-VehicleType.mapper";
import { VehicleTypeRepository } from "src/core/infrastructure/Repositories/vehicleType.repository";
import { messages } from "src/core/infrastructure/Shared/messages";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetOneVehicleTypeQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetOneVehicleTypeQuery)
export class GetOneVehicleTypeHandler implements IQueryHandler<GetOneVehicleTypeQuery, Result<ResponseVehicleTypeDto>> {
  private responseVehicleTypeMapper: ResponseVehicleTypeMapper
  constructor ( private readonly repository: VehicleTypeRepository) {
    this.responseVehicleTypeMapper = new ResponseVehicleTypeMapper()
  }
  
  
  async execute(query: GetOneVehicleTypeQuery): Promise<Result<ResponseVehicleTypeDto>> {
    const register = await this.repository.getById(query.id);

    if (!register)
      throw new NotFoundException(messages.VEHICLE_TYPE_NOT_FOUND(query.id))

    const responseData = this.responseVehicleTypeMapper.mapTo(register);

    return result(responseData).Success();
  }
  
}
