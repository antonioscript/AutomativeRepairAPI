import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { BadRequestException, NotFoundException } from "@nestjs/common"
import { messages } from "src/core/infrastructure/Shared/messages"
import { UpdateVehicleTypeDto } from "src/core/application/dtos/vehicleType/update-vehicleType.dto"
import { ResponseVehicleTypeDto } from "src/core/application/dtos/vehicleType/response-vehicleType.dto"
import { UpdateVehicleTypeMapper } from "src/core/domain/mapping/vehicleType/update-vehicleType.mapper"
import { ResponseVehicleTypeMapper } from "src/core/domain/mapping/vehicleType/response-vehicleType.mapper"
import { VehicleTypeRepository } from "src/core/infrastructure/Repositories/vehicleType.repository"

export class UpdateVehicleTypeCommand {
  constructor(
    public readonly id: number,
    public readonly request: UpdateVehicleTypeDto
  ) {}
}

@CommandHandler(UpdateVehicleTypeCommand)
export class UpdateVehicleTypeHandler implements ICommandHandler<UpdateVehicleTypeCommand, Result<ResponseVehicleTypeDto>> {
  private updateMapper: UpdateVehicleTypeMapper
  private responseMapper: ResponseVehicleTypeMapper

  constructor(private readonly repository: VehicleTypeRepository) {
    this.updateMapper = new UpdateVehicleTypeMapper()
    this.responseMapper = new ResponseVehicleTypeMapper()
  }

  async execute(command: UpdateVehicleTypeCommand): Promise<Result<ResponseVehicleTypeDto>> {

    if (command.id != command.request.id)
      throw new BadRequestException(messages.DEFAULT_UPDATE_BAD_REQUEST);

    const register  = await this.repository.getById(command.id);
    if (!register) {
      throw new NotFoundException(messages.VEHICLE_TYPE_NOT_FOUND(command.id));

    } else {

      const entity = this.updateMapper.mapFrom(command.request);
      const responseVehicleType = await this.repository.update(command.id, entity)
      const responseData =  this.responseMapper.mapTo(responseVehicleType)

      return result(responseData).Success();
    }
  }
}
