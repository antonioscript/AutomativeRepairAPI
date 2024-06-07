import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Result, result } from "src/core/infrastructure/Shared/result.util";
import { messages } from "src/core/infrastructure/Shared/messages";
import { NotFoundException } from "@nestjs/common";
import { InspectionOnServiceRepository } from "src/core/infrastructure/Repositories/inpectionOnService/inspectionOnService.repository";

export class DeleteInspectionOnServiceCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeleteInspectionOnServiceCommand)
export class DeleteInspectionOnServiceHandler implements ICommandHandler<DeleteInspectionOnServiceCommand, Result<{ id: number }>> {

  constructor(private readonly repository: InspectionOnServiceRepository) {
  }

  async execute(command: DeleteInspectionOnServiceCommand): Promise<Result<{ id: number }>> {


    const registerExists = await this.repository.getFirstByParameters({
      id: command.id,
    });

    if (!registerExists)
      throw new NotFoundException(messages.INSPECTION_ON_SERVICE_NOT_FOUND(command.id));

    const deletedId = await this.repository.delete(command.id);
    return result({ id: deletedId }).Success();
  }
}
