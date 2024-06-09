import { ResponseCustomerDto } from "src/core/application/dtos/customer/response-customer.dto"
import { RequestCustomerDto } from "src/core/application/dtos/customer/request-customer.dto"
import { RequestCustomerMapper } from "src/core/domain/mapping/customer/request-customer.mapper"
import { ResponseCustomerMapper } from "src/core/domain/mapping/customer/response-customer.mapper"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { BadRequestException } from "@nestjs/common"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { messages } from "src/core/infrastructure/Shared/messages"
import { CustomerRepository } from "src/core/infrastructure/Repositories/customer/customer.repository"

export class CreateCustomerCommand {
  constructor(public readonly request: RequestCustomerDto) {}
}

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler implements ICommandHandler<CreateCustomerCommand, Result<ResponseCustomerDto>> {
  private requestMapper: RequestCustomerMapper
  private responseMapper: ResponseCustomerMapper

  constructor(private readonly repository: CustomerRepository) {
    this.requestMapper = new RequestCustomerMapper()
    this.responseMapper = new ResponseCustomerMapper()
  }

  async execute(command: CreateCustomerCommand): Promise<Result<ResponseCustomerDto>> {

    const registerNameExists = await this.repository.getFirstByParameters({
      firstName: command.request.firstName,
      lastName: command.request.lastName,
    });

    if (registerNameExists)
      throw new BadRequestException(messages.CUSTOMER_NAME_ALREADY_EXISTS(command.request.firstName,command.request.lastName));

    const registerCPFExists = await this.repository.getFirstByParameters({
      cpf: command.request.cpf,
    });

    if (registerCPFExists)
      throw new BadRequestException(messages.CUSTOMER_CPF_ALREADY_EXISTS(command.request.cpf));

    const entity = this.requestMapper.mapFrom(command.request);
    const responseEntity = await this.repository.create(entity);
    const responseData = this.responseMapper.mapTo(responseEntity);
    
    return result(responseData).Success();
  }
}