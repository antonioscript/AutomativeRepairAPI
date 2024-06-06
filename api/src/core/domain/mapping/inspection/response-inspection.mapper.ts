import { ResponseInspectionDto } from "src/core/application/dtos/inspection/response-inspection.dto";
import { Mapper } from "../mapper"
import { InspectionEntity } from "../../entities/inspection.entity";


export class ResponseInspectionMapper extends Mapper<ResponseInspectionDto, InspectionEntity> {
  public mapFrom(data: ResponseInspectionDto): InspectionEntity {
    const inspection = new InspectionEntity()

    inspection.id = data.id
    inspection.appointmentId = data.appointmentId
    inspection.vehicleId = data.vehicleId;
    inspection.inspectionDate = data.inspectionDate;
    inspection.hasServiceOrder = data.hasServiceOrder;

    return inspection;
  }

  public mapTo(data: InspectionEntity): ResponseInspectionDto {
    const inspection = new ResponseInspectionDto()

    inspection.id = data.id
    inspection.appointmentId = data.appointmentId
    inspection.vehicleId = data.vehicleId;
    inspection.inspectionDate = data.inspectionDate;
    inspection.hasServiceOrder = data.hasServiceOrder;
    
    return inspection
  }
}
