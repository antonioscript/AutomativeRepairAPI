import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { BadRequestException, NotFoundException } from "@nestjs/common"
import { messages } from "src/core/infrastructure/Shared/messages"
import { UpdatePartDto } from "src/core/application/dtos/part/update-part.dto"
import { ResponsePartDto } from "src/core/application/dtos/part/response-part.dto"
import { UpdatePartMapper } from "src/core/domain/mapping/part/update-part.mapper"
import { ResponsePartMapper } from "src/core/domain/mapping/part/response-part.mapper"
import { PartRepository } from "src/core/infrastructure/Repositories/part/part.repository"

export class UpdatePartCommand {
  constructor(
    public readonly id: number,
    public readonly request: UpdatePartDto
  ) {}
}

@CommandHandler(UpdatePartCommand)
export class UpdatePartHandler implements ICommandHandler<UpdatePartCommand, Result<ResponsePartDto>> {
  private updateMapper: UpdatePartMapper
  private responseMapper: ResponsePartMapper

  constructor(private readonly repository: PartRepository) {
    this.updateMapper = new UpdatePartMapper()
    this.responseMapper = new ResponsePartMapper()
  }

  async execute(command: UpdatePartCommand): Promise<Result<ResponsePartDto>> {

    if (command.id != command.request.id)
      throw new BadRequestException(messages.DEFAULT_UPDATE_BAD_REQUEST);

    const register  = await this.repository.getById(command.id);
    if (!register) {
      throw new NotFoundException(messages.PART_NOT_FOUND(command.id));

    } else {

      const entity = this.updateMapper.mapFrom(command.request);
      const responsePart = await this.repository.update(command.id, entity)
      const responseData =  this.responseMapper.mapTo(responsePart)

      return result(responseData).Success();
    }
  }
}
