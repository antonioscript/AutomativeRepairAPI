import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Result, result } from "src/core/infrastructure/Shared/result.util";
import { messages } from "src/core/infrastructure/Shared/messages";
import { NotFoundException } from "@nestjs/common";
import { VehicleTypeRepository } from "src/core/infrastructure/Repositories/vehicleType/vehicleType.repository";

export class DeleteVehicleTypeCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeleteVehicleTypeCommand)
export class DeleteVehicleTypeHandler implements ICommandHandler<DeleteVehicleTypeCommand, Result<{ id: number }>> {

  constructor(private readonly repository: VehicleTypeRepository) {
  }

  async execute(command: DeleteVehicleTypeCommand): Promise<Result<{ id: number }>> {


    const registerExists = await this.repository.getFirstByParameters({
      id: command.id,
    });

    if (!registerExists)
      throw new NotFoundException(messages.VEHICLE_TYPE_NOT_FOUND(command.id));

    const deletedId = await this.repository.delete(command.id);
    return result({ id: deletedId }).Success();
  }
}
