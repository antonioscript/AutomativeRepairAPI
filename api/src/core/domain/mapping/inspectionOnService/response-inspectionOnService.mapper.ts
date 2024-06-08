import { ResponseInspectionOnServiceDto } from "src/core/application/dtos/inspectionOnService/response-InspectionOnService.dto";
import { Mapper } from "../mapper"
import { InspectionOnServiceEntity } from "../../entities/inspectionOnService.entity";


export class ResponseInspectionOnServiceMapper extends Mapper<ResponseInspectionOnServiceDto, InspectionOnServiceEntity> {
  public mapFrom(data: ResponseInspectionOnServiceDto): InspectionOnServiceEntity {
    const inspectionOnService = new InspectionOnServiceEntity()

    inspectionOnService.id = data.id
    inspectionOnService.inspectionId = data.inspectionId
    inspectionOnService.serviceId = data.serviceId;
    inspectionOnService.service = data.service;

    return inspectionOnService;
  }

  public mapTo(data: InspectionOnServiceEntity): ResponseInspectionOnServiceDto {
    const inspectionOnService = new ResponseInspectionOnServiceDto()

    inspectionOnService.id = data.id
    inspectionOnService.id = data.id
    inspectionOnService.inspectionId = data.inspectionId
    inspectionOnService.serviceId = data.serviceId;
    inspectionOnService.service = data.service;
    
    return inspectionOnService
  }
}
