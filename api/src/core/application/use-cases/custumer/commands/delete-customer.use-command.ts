import { CustomerRepository } from "src/core/infrastructure/Repositories/customer.repository"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class DeleteCustomerCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler implements ICommandHandler<DeleteCustomerCommand, Result<{ id: number }>> {

  constructor(private readonly repository: CustomerRepository) {
  }

  async execute(command: DeleteCustomerCommand): Promise<Result<{ id: number }>> {
    const deletedId = await this.repository.delete(command.id);
    return result({ id: deletedId }).Success();
  }
}
