import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { BadRequestException } from "@nestjs/common"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { messages } from "src/core/infrastructure/Shared/messages"
import { RequestVehicleTypeDto } from "src/core/application/dtos/vehicleType/request-vehicleType.dto"
import { ResponseVehicleTypeMapper } from "src/core/domain/mapping/vehicleType/response-vehicleType.mapper"
import { RequestVehicleTypeMapper } from "src/core/domain/mapping/vehicleType/request-vehicleType.mapper"
import { ResponseVehicleTypeDto } from "src/core/application/dtos/vehicleType/response-vehicleType.dto"
import { VehicleTypeRepository } from "src/core/infrastructure/Repositories/vehicleType/vehicleType.repository"

export class CreateVehicleTypeCommand {
  constructor(public readonly request: RequestVehicleTypeDto) {}
}

@CommandHandler(CreateVehicleTypeCommand)
export class CreateVehicleTypeHandler implements ICommandHandler<CreateVehicleTypeCommand, Result<ResponseVehicleTypeDto>> {
  private requestMapper: RequestVehicleTypeMapper
  private responseMapper: ResponseVehicleTypeMapper

  constructor(private readonly repository: VehicleTypeRepository) {
    this.requestMapper = new RequestVehicleTypeMapper()
    this.responseMapper = new ResponseVehicleTypeMapper()
  }

  async execute(command: CreateVehicleTypeCommand): Promise<Result<ResponseVehicleTypeDto>> {

    const registerExists = await this.repository.getFirstByParameters({
      name: command.request.name
    });

    if (registerExists)
      throw new BadRequestException(messages.VEHICLE_TYPE_ALREADY_EXISTS(command.request.name));

    const entity = this.requestMapper.mapFrom(command.request);
    const responseEntity = await this.repository.create(entity);
    const responseData = this.responseMapper.mapTo(responseEntity);
    
    return result(responseData).Success();
  }
}