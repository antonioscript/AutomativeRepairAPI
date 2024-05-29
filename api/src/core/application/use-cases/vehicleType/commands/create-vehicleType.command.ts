import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { BadRequestException } from "@nestjs/common"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { messages } from "src/core/infrastructure/Shared/messages"
import { RequestVehicleTypeDto } from "src/core/application/dtos/vehicleType/request-vehicleType.dto"
import { ResponseVehicleTypeMapper } from "src/core/domain/mapping/vehicleType/response-vehicleType.mapper"
import { RequestVehicleTypeMapper } from "src/core/domain/mapping/vehicleType/request-vehicleType.mapper"
import { ResponseVehicleTypeDto } from "src/core/application/dtos/vehicleType/response-vehicleType.dto"
import { VehicleTypeRepository } from "src/core/infrastructure/Repositories/vehicleType.repository"

export class CreateVehicleTypeCommand {
  constructor(public readonly requestVehicleTypeDto: RequestVehicleTypeDto) {}
}

@CommandHandler(CreateVehicleTypeCommand)
export class CreateVehicleTypeHandler implements ICommandHandler<CreateVehicleTypeCommand, Result<ResponseVehicleTypeDto>> {
  private requestVehicleTypeMapper: RequestVehicleTypeMapper
  private responseVehicleTypeMapper: ResponseVehicleTypeMapper

  constructor(private readonly repository: VehicleTypeRepository) {
    this.requestVehicleTypeMapper = new RequestVehicleTypeMapper()
    this.responseVehicleTypeMapper = new ResponseVehicleTypeMapper()
  }

  async execute(command: CreateVehicleTypeCommand): Promise<Result<ResponseVehicleTypeDto>> {

    const registerExists = await this.repository.getFirstByParameters({
      name: command.requestVehicleTypeDto.name
    });

    if (registerExists)
      throw new BadRequestException(messages.VEHICLE_TYPE_ALREADY_EXISTS(command.requestVehicleTypeDto.name));

    const entity = this.requestVehicleTypeMapper.mapFrom(command.requestVehicleTypeDto);
    const responseVehicleType = await this.repository.create(entity);
    const responseData = this.responseVehicleTypeMapper.mapTo(responseVehicleType);
    
    return result(responseData).Success();
  }
}