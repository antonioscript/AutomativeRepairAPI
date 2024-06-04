
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { BadRequestException } from "@nestjs/common"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { messages } from "src/core/infrastructure/Shared/messages"
import { ResponsePartDto } from "src/core/application/dtos/part/response-part.dto"
import { RequestPartDto } from "src/core/application/dtos/part/request-part.dto"
import { RequestPartMapper } from "src/core/domain/mapping/part/request-part.mapper"
import { ResponsePartMapper } from "src/core/domain/mapping/part/response-part.mapper"
import { PartRepository } from "src/core/infrastructure/Repositories/part/part.repository"

export class CreatePartCommand {
  constructor(public readonly request: RequestPartDto) {}
}

@CommandHandler(CreatePartCommand)
export class CreatePartHandler implements ICommandHandler<CreatePartCommand, Result<ResponsePartDto>> {
  private requestMapper: RequestPartMapper
  private responseMapper: ResponsePartMapper

  constructor(private readonly repository: PartRepository) {
    this.requestMapper = new RequestPartMapper()
    this.responseMapper = new ResponsePartMapper()
  }

  async execute(command: CreatePartCommand): Promise<Result<ResponsePartDto>> {

    const registerExists = await this.repository.getFirstByParameters({
      name: command.request.name
    });

    if (registerExists)
      throw new BadRequestException(messages.PART_ALREADY_EXISTS(command.request.name));

    const entity = this.requestMapper.mapFrom(command.request);
    const responseEntity = await this.repository.create(entity);
    const responseData = this.responseMapper.mapTo(responseEntity);
    
    return result(responseData).Success();
  }
}