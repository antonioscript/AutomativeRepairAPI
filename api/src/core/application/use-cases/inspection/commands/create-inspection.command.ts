
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { BadRequestException } from "@nestjs/common"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { messages } from "src/core/infrastructure/Shared/messages"
import { RequestInspectionDto } from "src/core/application/dtos/inspection/request-inspection.dto"
import { ResponseInspectionDto } from "src/core/application/dtos/inspection/response-inspection.dto"
import { RequestInspectionMapper } from "src/core/domain/mapping/inspection/request-inspection.mapper"
import { ResponseInspectionMapper } from "src/core/domain/mapping/inspection/response-inspection.mapper"
import { InspectionRepository } from "src/core/infrastructure/Repositories/inspection/inspection.repository"
import { ServiceRepository } from "src/core/infrastructure/Repositories/service/service.repository"
import { constants } from "src/core/infrastructure/Shared/constants"

export class CreateInspectionCommand {
  constructor(public readonly request: RequestInspectionDto) {}
}

@CommandHandler(CreateInspectionCommand)
export class CreateInspectionHandler implements ICommandHandler<CreateInspectionCommand, Result<ResponseInspectionDto>> {
  private requestMapper: RequestInspectionMapper
  private responseMapper: ResponseInspectionMapper

  constructor(private readonly repository: InspectionRepository, private readonly serviceRepository: ServiceRepository) {
    this.requestMapper = new RequestInspectionMapper()
    this.responseMapper = new ResponseInspectionMapper()
  }

  async execute(command: CreateInspectionCommand): Promise<Result<ResponseInspectionDto>> {

    const registerExists = await this.repository.getFirstByParameters({
      appointmentId: command.request.appointmentId
    });

    if (registerExists)
      throw new BadRequestException(messages.INSPECTION_ALREADY_EXISTS(command.request.appointmentId));

    const entity = this.requestMapper.mapFrom(command.request);

    const arrayServiceIds = command.request.services?.map(s => s.serviceId) || [];
    
    let totalValue = 0;
    for (const serviceId of arrayServiceIds) {
      const service = await this.serviceRepository.getById(serviceId);
      totalValue += service.value;
    }

    entity.value = (totalValue * constants.PERCENTAGE_DEFAULT_SERVICE) + totalValue;

    const responseEntity = await this.repository.create(entity);
    const responseData = this.responseMapper.mapTo(responseEntity);
    
    return result(responseData).Success();
  }
}