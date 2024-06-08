import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Result, result } from "src/core/infrastructure/Shared/result.util";
import { messages } from "src/core/infrastructure/Shared/messages";
import { NotFoundException } from "@nestjs/common";
import { ServiceOnPartRepository } from "src/core/infrastructure/Repositories/serviceOnPart/serviceOnPart.repository";

export class DeleteServiceOnPartCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeleteServiceOnPartCommand)
export class DeleteServiceOnPartHandler implements ICommandHandler<DeleteServiceOnPartCommand, Result<{ id: number }>> {

  constructor(private readonly repository: ServiceOnPartRepository) {
  }

  async execute(command: DeleteServiceOnPartCommand): Promise<Result<{ id: number }>> {


    const registerExists = await this.repository.getFirstByParameters({
      id: command.id,
    });

    if (!registerExists)
      throw new NotFoundException(messages.PART_NOT_FOUND(command.id));

    const deletedId = await this.repository.delete(command.id);
    return result({ id: deletedId }).Success();
  }
}
