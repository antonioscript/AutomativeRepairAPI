
import { RequestInspectionDto } from "src/core/application/dtos/inspection/request-inspection.dto";
import { Mapper } from "../mapper"
import { InspectionEntity } from "../../entities/inspection.entity";

export class RequestInspectionMapper extends Mapper<RequestInspectionDto, InspectionEntity> {
  public mapFrom(data: RequestInspectionDto): InspectionEntity {
    const inspection = new InspectionEntity()

    inspection.appointmentId = data.appointmentId
    inspection.vehicleId = data.vehicleId;
    //inspection.inspectionDate = data.inspectionDate;
    //inspection.hasServiceOrder = data.hasServiceOrder;

    return inspection;
  }

  public mapTo(data: InspectionEntity): RequestInspectionDto {
    const inspection = new RequestInspectionDto()

    inspection.appointmentId = data.appointmentId
    inspection.vehicleId = data.vehicleId;
    //inspection.inspectionDate = data.inspectionDate;
    //inspection.hasServiceOrder = data.hasServiceOrder;

    return inspection;
  }
}
