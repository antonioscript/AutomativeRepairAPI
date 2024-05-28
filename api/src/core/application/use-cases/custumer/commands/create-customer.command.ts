import { ResponseCustomerDto } from "src/core/application/dtos/customer/response-customer.dto"
import { RequestCustomerDto } from "src/core/application/dtos/customer/request-customer.dto"
import { RequestCustomerMapper } from "src/core/domain/mapping/customer/request-customer.mapper"
import { ResponseCustomerMapper } from "src/core/domain/mapping/customer/response-customer.mapper"
import { CustomerRepository } from "src/core/infrastructure/Repositories/customer.repository"
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { BadRequestException, ConflictException } from "@nestjs/common"
import { Result, result } from "src/core/infrastructure/Shared/result.util"

export class CreateCustomerCommand {
  constructor(public readonly requestCustomerDto: RequestCustomerDto) {}
}

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler implements ICommandHandler<CreateCustomerCommand, Result<ResponseCustomerDto>> {
  private requestCustomerMapper: RequestCustomerMapper
  private responseCustomerMapper: ResponseCustomerMapper

  constructor(private readonly repository: CustomerRepository) {
    this.requestCustomerMapper = new RequestCustomerMapper()
    this.responseCustomerMapper = new ResponseCustomerMapper()
  }

  async execute(command: CreateCustomerCommand): Promise<Result<ResponseCustomerDto>> {

    //Se o registro existe
    const registerExists = await this.repository.getFirstByParameters({
      firstName: command.requestCustomerDto.firstName,
      lastName: command.requestCustomerDto.lastName,
      cpf: command.requestCustomerDto.cpf
    });

    if (registerExists)
      throw new BadRequestException("Já existe um cliente com esses dados");

    const entity = this.requestCustomerMapper.mapFrom(command.requestCustomerDto);
    const responseCustomer = await this.repository.create(entity);
    const responseData = this.responseCustomerMapper.mapTo(responseCustomer);
    
    return result(responseData).Success();
  }
}