import { ResponseCustomerDto } from "src/core/application/dtos/customer/response-customer.dto"
import { ResponseCustomerMapper } from "src/core/domain/mapping/customer/response-customer.mapper"
import { CustomerRepository } from "src/core/infrastructure/Repositories/customer.repository"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { UpdateCustomerDto } from "src/core/application/dtos/customer/update-customer.dto"
import { UpdateCustomerMapper } from "src/core/domain/mapping/customer/update-customer.mapper"
import { Result, result } from "src/core/infrastructure/Shared/result.util"

export class UpdateCustomerCommand {
  constructor(
    public readonly id: number,
    public readonly updateCustomerDto: UpdateCustomerDto
  ) {}
}

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler implements ICommandHandler<UpdateCustomerCommand, Result<ResponseCustomerDto>> {
  private updateCustomerMapper: UpdateCustomerMapper
  private responseCustomerMapper: ResponseCustomerMapper

  constructor(private readonly repository: CustomerRepository) {
    this.updateCustomerMapper = new UpdateCustomerMapper()
    this.responseCustomerMapper = new ResponseCustomerMapper()
  }

  async execute(command: UpdateCustomerCommand): Promise<Result<ResponseCustomerDto>> {
    const entity = this.updateCustomerMapper.mapFrom(command.updateCustomerDto);
    const responseCustomer = await this.repository.update(command.id, entity)
    const responseData =  this.responseCustomerMapper.mapTo(responseCustomer)

    return result(responseData).Success();
  }
}
