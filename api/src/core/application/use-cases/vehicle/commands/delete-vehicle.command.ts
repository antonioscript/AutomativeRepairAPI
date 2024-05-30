import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { VehicleRepository } from "src/core/infrastructure/Repositories/vehicle/vehicle.repository";
import { messages } from "src/core/infrastructure/Shared/messages";
import { Result, result } from "src/core/infrastructure/Shared/result.util";


export class DeleteVehicleCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeleteVehicleCommand)
export class DeleteVehicleHandler implements ICommandHandler<DeleteVehicleCommand, Result<{ id: number }>> {

  constructor(private readonly repository: VehicleRepository) {
  }

  async execute(command: DeleteVehicleCommand): Promise<Result<{ id: number }>> {


    const registerExists = await this.repository.getFirstByParameters({
      id: command.id,
    });

    if (!registerExists)
      throw new NotFoundException(messages.VEHICLE_NOT_FOUND(command.id));

    const deletedId = await this.repository.delete(command.id);
    return result({ id: deletedId }).Success();
  }
}
