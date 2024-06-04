import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Result, result } from "src/core/infrastructure/Shared/result.util";
import { messages } from "src/core/infrastructure/Shared/messages";
import { NotFoundException } from "@nestjs/common";
import { AppointmentStatusRepository } from "src/core/infrastructure/Repositories/appointmentStatus/appointmentStatus.repository";

export class DeleteAppointmentStatusCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeleteAppointmentStatusCommand)
export class DeleteAppointmentStatusHandler implements ICommandHandler<DeleteAppointmentStatusCommand, Result<{ id: number }>> {

  constructor(private readonly repository: AppointmentStatusRepository) {
  }

  async execute(command: DeleteAppointmentStatusCommand): Promise<Result<{ id: number }>> {


    const registerExists = await this.repository.getFirstByParameters({
      id: command.id,
    });

    if (!registerExists)
      throw new NotFoundException(messages.APPOINTMENT_STATUS_NOT_FOUND(command.id));

    const deletedId = await this.repository.delete(command.id);
    return result({ id: deletedId }).Success();
  }
}
