import { CustomerRepository } from "src/core/infrastructure/Repositories/customer.repository"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"

export class DeleteCustomerCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler implements ICommandHandler<DeleteCustomerCommand, { id: number }> {

  constructor(private readonly repository: CustomerRepository) {
  }

  async execute(command: DeleteCustomerCommand): Promise<{ id: number }> {
    const deletedId = await this.repository.delete(command.id);
    return { id: deletedId };
  }
}
