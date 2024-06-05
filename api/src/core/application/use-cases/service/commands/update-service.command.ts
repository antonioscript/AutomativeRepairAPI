import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { BadRequestException, NotFoundException } from "@nestjs/common"
import { messages } from "src/core/infrastructure/Shared/messages"
import { UpdateServiceDto } from "src/core/application/dtos/service/update-service.dto"
import { ResponseServiceDto } from "src/core/application/dtos/service/response-service.dto"
import { UpdateServiceMapper } from "src/core/domain/mapping/services/update-service.mapper"
import { ResponseServiceMapper } from "src/core/domain/mapping/services/response-service.mapper"
import { ServiceRepository } from "src/core/infrastructure/Repositories/service/service.repository"

export class UpdateServiceCommand {
  constructor(
    public readonly id: number,
    public readonly request: UpdateServiceDto
  ) {}
}

@CommandHandler(UpdateServiceCommand)
export class UpdateServiceHandler implements ICommandHandler<UpdateServiceCommand, Result<ResponseServiceDto>> {
  private updateMapper: UpdateServiceMapper
  private responseMapper: ResponseServiceMapper

  constructor(private readonly repository: ServiceRepository) {
    this.updateMapper = new UpdateServiceMapper()
    this.responseMapper = new ResponseServiceMapper()
  }

  async execute(command: UpdateServiceCommand): Promise<Result<ResponseServiceDto>> {

    if (command.id != command.request.id)
      throw new BadRequestException(messages.DEFAULT_UPDATE_BAD_REQUEST);

    const register  = await this.repository.getById(command.id);
    if (!register) {
      throw new NotFoundException(messages.SERVICE_NOT_FOUND(command.id));

    } else {

      const entity = this.updateMapper.mapFrom(command.request);
      const responseService = await this.repository.update(command.id, entity)
      const responseData =  this.responseMapper.mapTo(responseService)

      return result(responseData).Success();
    }
  }
}
