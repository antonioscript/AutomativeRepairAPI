import { ResponseCustomerDto } from "src/application/dtos/customer/response-customer.dto"
import { ResponseCustomerMapper } from "src/domain/mapping/customer/response-customer.mapper"
import { CustomerRepository } from "src/infrastructure/Repositories/customer.repository"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { UpdateCustomerDto } from "src/application/dtos/customer/update-customer.dto"
import { UpdateCustomerMapper } from "src/domain/mapping/customer/update-customer.mapper"

export class UpdateCustomerCommand {
  constructor(
    public readonly id: number,
    public readonly updateCustomerDto: UpdateCustomerDto
  ) {}
}

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler implements ICommandHandler<UpdateCustomerCommand, ResponseCustomerDto> {
  private updateCustomerMapper: UpdateCustomerMapper
  private responseCustomerMapper: ResponseCustomerMapper

  constructor(private readonly repository: CustomerRepository) {
    this.updateCustomerMapper = new UpdateCustomerMapper()
    this.responseCustomerMapper = new ResponseCustomerMapper()
  }

  async execute(command: UpdateCustomerCommand): Promise<ResponseCustomerDto> {
    const entity = this.updateCustomerMapper.mapFrom(command.updateCustomerDto);
    const responseCustomer = await this.repository.update(command.id, entity)
    return this.responseCustomerMapper.mapTo(responseCustomer)
  }
}
