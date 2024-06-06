import { RequestInspectionOnServiceDto } from "src/core/application/dtos/inspectionOnService/request-InspectionOnService.dto";
import { Mapper } from "../mapper"
import { InspectionOnServiceEntity } from "../../entities/inspectionOnService.entity";

export class RequestInspectionOnServiceMapper extends Mapper<RequestInspectionOnServiceDto, InspectionOnServiceEntity> {
  public mapFrom(data: RequestInspectionOnServiceDto): InspectionOnServiceEntity {
    const inspectionOnService = new InspectionOnServiceEntity()

    inspectionOnService.inspectionId = data.inspectionId
    inspectionOnService.serviceId = data.serviceId;

    return inspectionOnService;
  }

  public mapTo(data: InspectionOnServiceEntity): RequestInspectionOnServiceDto {
    const inspectionOnService = new RequestInspectionOnServiceDto()

    inspectionOnService.inspectionId = data.inspectionId
    inspectionOnService.serviceId = data.serviceId;

    return inspectionOnService;
  }
}
