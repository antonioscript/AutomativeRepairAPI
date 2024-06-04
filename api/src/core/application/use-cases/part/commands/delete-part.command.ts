import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Result, result } from "src/core/infrastructure/Shared/result.util";
import { messages } from "src/core/infrastructure/Shared/messages";
import { NotFoundException } from "@nestjs/common";
import { PartRepository } from "src/core/infrastructure/Repositories/part/part.repository";

export class DeletePartCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeletePartCommand)
export class DeletePartHandler implements ICommandHandler<DeletePartCommand, Result<{ id: number }>> {

  constructor(private readonly repository: PartRepository) {
  }

  async execute(command: DeletePartCommand): Promise<Result<{ id: number }>> {


    const registerExists = await this.repository.getFirstByParameters({
      id: command.id,
    });

    if (!registerExists)
      throw new NotFoundException(messages.PART_NOT_FOUND(command.id));

    const deletedId = await this.repository.delete(command.id);
    return result({ id: deletedId }).Success();
  }
}
