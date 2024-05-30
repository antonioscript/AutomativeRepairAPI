import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ResponseVehicleDto } from "src/core/application/dtos/vehicle/response-vehicle.dto";
import { UpdateVehicleDto } from "src/core/application/dtos/vehicle/update-vehicle.dto";
import { ResponseVehicleMapper } from "src/core/domain/mapping/vehicle/response-vehicle.mapper";
import { UpdateVehicleMapper } from "src/core/domain/mapping/vehicle/update-vehicle.mapper";
import { VehicleRepository } from "src/core/infrastructure/Repositories/vehicle/vehicle.repository";
import { messages } from "src/core/infrastructure/Shared/messages";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class UpdateVehicleCommand {
  constructor(
    public readonly id: number,
    public readonly request: UpdateVehicleDto
  ) {}
}

@CommandHandler(UpdateVehicleCommand)
export class UpdateVehicleHandler implements ICommandHandler<UpdateVehicleCommand, Result<ResponseVehicleDto>> {
  private updateMapper: UpdateVehicleMapper
  private responseMapper: ResponseVehicleMapper

  constructor(private readonly repository: VehicleRepository) {
    this.updateMapper = new UpdateVehicleMapper()
    this.responseMapper = new ResponseVehicleMapper()
  }

  async execute(command: UpdateVehicleCommand): Promise<Result<ResponseVehicleDto>> {

    if (command.id != command.request.id)
      throw new BadRequestException(messages.DEFAULT_UPDATE_BAD_REQUEST);

    const register  = await this.repository.getById(command.id);
    if (!register) {
      throw new NotFoundException(messages.VEHICLE_NOT_FOUND(command.id));

    } else {

      const entity = await this.repository.update(command.id, command.request)
      const responseData =  this.responseMapper.mapTo(entity)

      return result(responseData).Success();
    }
  }
}
