import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Result, result } from "src/core/infrastructure/Shared/result.util";
import { messages } from "src/core/infrastructure/Shared/messages";
import { NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/core/infrastructure/Repositories/user/user.repository";

export class DeleteUserCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand, Result<{ id: number }>> {

  constructor(private readonly repository: UserRepository) {
  }

  async execute(command: DeleteUserCommand): Promise<Result<{ id: number }>> {


    const registerExists = await this.repository.getFirstByParameters({
      id: command.id,
    });

    if (!registerExists)
      throw new NotFoundException(messages.USER_NOT_FOUND(command.id));

    const deletedId = await this.repository.delete(command.id);
    return result({ id: deletedId }).Success();
  }
}
