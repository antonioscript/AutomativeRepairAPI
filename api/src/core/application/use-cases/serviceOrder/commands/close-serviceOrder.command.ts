import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { UpdateInspectionMapper } from "src/core/domain/mapping/inspection/update-inspection.mapper"
import { ResponseInspectionDto } from "src/core/application/dtos/inspection/response-inspection.dto"
import { ResponseInspectionMapper } from "src/core/domain/mapping/inspection/response-inspection.mapper"
import { InspectionRepository } from "src/core/infrastructure/Repositories/inspection/inspection.repository"
import { RequestServiceOrderDto } from "src/core/application/dtos/serviceOrder/request-serviceOrder.dto"


export class CloseServiceOrderCommand {
  constructor(
    public readonly request: RequestServiceOrderDto
  ) {}
}

@CommandHandler(CloseServiceOrderCommand)
export class CloseServiceOrderHandler implements ICommandHandler<CloseServiceOrderCommand, Result<ResponseInspectionDto>> {
  private updateMapper: UpdateInspectionMapper
  private responseMapper: ResponseInspectionMapper

  constructor(private readonly repository: InspectionRepository) {
    this.updateMapper = new UpdateInspectionMapper()
    this.responseMapper = new ResponseInspectionMapper()
  }

  async execute(command: CloseServiceOrderCommand): Promise<Result<ResponseInspectionDto>> {
      const id = command.request.inspectionId;
      const data = await this.repository.getById(id);

      const entity = this.updateMapper.mapFrom(command.request);

      entity.appointmentId =  data.appointmentId;
      entity.vehicleId  = data.vehicleId;
      entity.inspectionDate = data.inspectionDate;
      entity.hasServiceOrder = true;
      entity.isServiceOrder = true;

      entity.isClosed = true;

      const responseInspection = await this.repository.update(id, entity)
      const responseData =  this.responseMapper.mapTo(responseInspection)

      return result(responseData).Success();
  }
}
