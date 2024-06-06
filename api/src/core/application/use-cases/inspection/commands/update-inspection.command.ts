import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { BadRequestException, NotFoundException } from "@nestjs/common"
import { messages } from "src/core/infrastructure/Shared/messages"
import { UpdateInspectionDto } from "src/core/application/dtos/inspection/update-inspection.dto"
import { UpdateInspectionMapper } from "src/core/domain/mapping/inspection/update-inspection.mapper"
import { ResponseInspectionDto } from "src/core/application/dtos/inspection/response-inspection.dto"
import { ResponseInspectionMapper } from "src/core/domain/mapping/inspection/response-inspection.mapper"
import { InspectionRepository } from "src/core/infrastructure/Repositories/inspection/inspection.repository"


export class UpdateInspectionCommand {
  constructor(
    public readonly id: number,
    public readonly request: UpdateInspectionDto
  ) {}
}

@CommandHandler(UpdateInspectionCommand)
export class UpdateInspectionHandler implements ICommandHandler<UpdateInspectionCommand, Result<ResponseInspectionDto>> {
  private updateMapper: UpdateInspectionMapper
  private responseMapper: ResponseInspectionMapper

  constructor(private readonly repository: InspectionRepository) {
    this.updateMapper = new UpdateInspectionMapper()
    this.responseMapper = new ResponseInspectionMapper()
  }

  async execute(command: UpdateInspectionCommand): Promise<Result<ResponseInspectionDto>> {

    if (command.id != command.request.id)
      throw new BadRequestException(messages.DEFAULT_UPDATE_BAD_REQUEST);

    const register  = await this.repository.getById(command.id);
    if (!register) {
      throw new NotFoundException(messages.INSPECTION_NOT_FOUND(command.id));

    } else {

      const entity = this.updateMapper.mapFrom(command.request);
      const responseInspection = await this.repository.update(command.id, entity)
      const responseData =  this.responseMapper.mapTo(responseInspection)

      return result(responseData).Success();
    }
  }
}
