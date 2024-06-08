
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { BadRequestException } from "@nestjs/common"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { messages } from "src/core/infrastructure/Shared/messages"
import { RequestServiceOnPartMapper } from "src/core/domain/mapping/serviceOnPart/request-serviceOnPart.mapper"
import { RequestServiceOnPartDto } from "src/core/application/dtos/serviceOnPart/request-serviceOnPart.dto"
import { ResponseServiceOnPartDto } from "src/core/application/dtos/serviceOnPart/response-serviceOnPart.dto"
import { ResponseServiceOnPartMapper } from "src/core/domain/mapping/serviceOnPart/response-serviceOnPart.mapper"
import { ServiceOnPartRepository } from "src/core/infrastructure/Repositories/serviceOnPart/serviceOnPart.repository"

export class CreateServiceOnPartCommand {
  constructor(public readonly request: RequestServiceOnPartDto) {}
}

@CommandHandler(CreateServiceOnPartCommand)
export class CreateServiceOnPartHandler implements ICommandHandler<CreateServiceOnPartCommand, Result<ResponseServiceOnPartDto>> {
  private requestMapper: RequestServiceOnPartMapper
  private responseMapper: ResponseServiceOnPartMapper

  constructor(private readonly repository: ServiceOnPartRepository) {
    this.requestMapper = new RequestServiceOnPartMapper()
    this.responseMapper = new ResponseServiceOnPartMapper()
  }

  async execute(command: CreateServiceOnPartCommand): Promise<Result<ResponseServiceOnPartDto>> {

    const entity = this.requestMapper.mapFrom(command.request);
    const responseEntity = await this.repository.create(entity);
    const responseData = this.responseMapper.mapTo(responseEntity);
    
    return result(responseData).Success();
  }
}