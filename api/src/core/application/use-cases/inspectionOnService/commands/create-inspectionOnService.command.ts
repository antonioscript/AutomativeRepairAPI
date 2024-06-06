
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { BadRequestException } from "@nestjs/common"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { messages } from "src/core/infrastructure/Shared/messages"
import { RequestInspectionOnServiceDto } from "src/core/application/dtos/inspectionOnService/request-InspectionOnService.dto"
import { RequestInspectionOnServiceMapper } from "src/core/domain/mapping/inspectionOnService/request-inspectionOnService.mapper"
import { ResponseInspectionOnServiceDto } from "src/core/application/dtos/inspectionOnService/response-InspectionOnService.dto"
import { InspectionOnServiceRepository } from "src/core/infrastructure/Repositories/inpectionOnService/inspectionOnService.repository"
import { ResponseInspectionOnServiceMapper } from "src/core/domain/mapping/inspectionOnService/response-inspectionOnService.mapper"

export class CreateInspectionOnServiceCommand {
  constructor(public readonly request: RequestInspectionOnServiceDto) {}
}

@CommandHandler(CreateInspectionOnServiceCommand)
export class CreateInspectionOnServiceHandler implements ICommandHandler<CreateInspectionOnServiceCommand, Result<ResponseInspectionOnServiceDto>> {
  private requestMapper: RequestInspectionOnServiceMapper
  private responseMapper: ResponseInspectionOnServiceMapper

  constructor(private readonly repository: InspectionOnServiceRepository) {
    this.requestMapper = new RequestInspectionOnServiceMapper()
    this.responseMapper = new ResponseInspectionOnServiceMapper()
  }

  async execute(command: CreateInspectionOnServiceCommand): Promise<Result<ResponseInspectionOnServiceDto>> {

    const registerExists = await this.repository.getFirstByParameters({
      inspectionId: command.request.inspectionId,
      serviceId: command.request.serviceId
    });

    if (registerExists)
      throw new BadRequestException(messages.INSPECTION_ON_SERVICE_ALREADY_EXISTS(command.request.inspectionId, command.request.serviceId));

    const entity = this.requestMapper.mapFrom(command.request);
    const responseEntity = await this.repository.create(entity);
    const responseData = this.responseMapper.mapTo(responseEntity);
    
    return result(responseData).Success();
  }
}