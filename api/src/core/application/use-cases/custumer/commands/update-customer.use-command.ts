import { ResponseCustomerDto } from "src/core/application/dtos/customer/response-customer.dto"
import { ResponseCustomerMapper } from "src/core/domain/mapping/customer/response-customer.mapper"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { UpdateCustomerDto } from "src/core/application/dtos/customer/update-customer.dto"
import { UpdateCustomerMapper } from "src/core/domain/mapping/customer/update-customer.mapper"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { BadRequestException, NotFoundException } from "@nestjs/common"
import { messages } from "src/core/infrastructure/Shared/messages"
import { CustomerRepository } from "src/core/infrastructure/Repositories/customer/customer.repository"

export class UpdateCustomerCommand {
  constructor(
    public readonly id: number,
    public readonly request: UpdateCustomerDto
  ) {}
}

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler implements ICommandHandler<UpdateCustomerCommand, Result<ResponseCustomerDto>> {
  private updateMapper: UpdateCustomerMapper
  private responseMapper: ResponseCustomerMapper

  constructor(private readonly repository: CustomerRepository) {
    this.updateMapper = new UpdateCustomerMapper()
    this.responseMapper = new ResponseCustomerMapper()
  }

  async execute(command: UpdateCustomerCommand): Promise<Result<ResponseCustomerDto>> {

    if (command.id != command.request.id)
      throw new BadRequestException(messages.DEFAULT_UPDATE_BAD_REQUEST);

    const register  = await this.repository.getById(command.id);
    if (!register) {
      throw new NotFoundException(messages.CUSTOMER_NOT_FOUND(command.id));

    } else {

      const entity = this.updateMapper.mapFrom(command.request);
      const responseCustomer = await this.repository.update(command.id, entity)
      const responseData =  this.responseMapper.mapTo(responseCustomer)

      return result(responseData).Success();
    }
  }
}
