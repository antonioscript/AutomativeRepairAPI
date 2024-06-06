import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Result, result } from "src/core/infrastructure/Shared/result.util";
import { messages } from "src/core/infrastructure/Shared/messages";
import { NotFoundException } from "@nestjs/common";
import { InspectionRepository } from "src/core/infrastructure/Repositories/inspection/inspection.repository";

export class DeleteInspectionCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeleteInspectionCommand)
export class DeleteInspectionHandler implements ICommandHandler<DeleteInspectionCommand, Result<{ id: number }>> {

  constructor(private readonly repository: InspectionRepository) {
  }

  async execute(command: DeleteInspectionCommand): Promise<Result<{ id: number }>> {


    const registerExists = await this.repository.getFirstByParameters({
      id: command.id,
    });

    if (!registerExists)
      throw new NotFoundException(messages.INSPECTION_NOT_FOUND(command.id));

    const deletedId = await this.repository.delete(command.id);
    return result({ id: deletedId }).Success();
  }
}
