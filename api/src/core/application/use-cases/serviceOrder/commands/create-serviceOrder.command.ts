import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { UpdateInspectionMapper } from "src/core/domain/mapping/inspection/update-inspection.mapper"
import { ResponseInspectionDto } from "src/core/application/dtos/inspection/response-inspection.dto"
import { ResponseInspectionMapper } from "src/core/domain/mapping/inspection/response-inspection.mapper"
import { InspectionRepository } from "src/core/infrastructure/Repositories/inspection/inspection.repository"
import { RequestServiceOrderDto } from "src/core/application/dtos/serviceOrder/request-serviceOrder.dto"
import { InspectionOnServiceRepository } from "src/core/infrastructure/Repositories/inpectionOnService/inspectionOnService.repository"
import { ServiceOnPartRepository } from "src/core/infrastructure/Repositories/serviceOnPart/serviceOnPart.repository"
import { PartRepository } from "src/core/infrastructure/Repositories/part/part.repository"
import { BadRequestException } from "@nestjs/common"
import { messages } from "src/core/infrastructure/Shared/messages"


export class CreateServiceOrderCommand {
  constructor(
    public readonly request: RequestServiceOrderDto
  ) {}
}

@CommandHandler(CreateServiceOrderCommand)
export class CreateServiceOrderHandler implements ICommandHandler<CreateServiceOrderCommand, Result<ResponseInspectionDto>> {
  private updateMapper: UpdateInspectionMapper
  private responseMapper: ResponseInspectionMapper

  constructor(
    private readonly repository: InspectionRepository,
    private readonly inspectionOnServiceRepository: InspectionOnServiceRepository,
    private readonly serviceOnPartRepository: ServiceOnPartRepository,
    private readonly partRepository: PartRepository
  ) {
    this.updateMapper = new UpdateInspectionMapper()
    this.responseMapper = new ResponseInspectionMapper()
  }

  async execute(command: CreateServiceOrderCommand): Promise<Result<ResponseInspectionDto>> {
      const id = command.request.inspectionId;
      const data = await this.repository.getById(id);

      //Controle de estoque
      const arrayServices = await this.inspectionOnServiceRepository.getAllByParameters({
        inspectionId: data.id
      });

      for (const serviceId of arrayServices.map(s => s.serviceId)) {
        const partArray = await this.serviceOnPartRepository.getAllByParameters({
          serviceId: serviceId
        });

        for (const partId of partArray.map(p => p.partId)) {
          const partQuantity = (await this.partRepository.getById(partId)).quantity;
          
          if (partQuantity < 1)
            throw new BadRequestException(messages.SERVICE_ORDER_NOT_CREATE(partId));
        }
      }

      const entity = this.updateMapper.mapFrom(command.request);

      entity.appointmentId =  data.appointmentId;
      entity.vehicleId  = data.vehicleId;
      entity.inspectionDate = data.inspectionDate;
      entity.hasServiceOrder = true;

      entity.isServiceOrder = true;

      const responseInspection = await this.repository.update(id, entity)
      const responseData =  this.responseMapper.mapTo(responseInspection)

      return result(responseData).Success();
  }
}
