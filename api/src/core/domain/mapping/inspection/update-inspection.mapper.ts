
import { UpdateInspectionDto } from "src/core/application/dtos/inspection/update-inspection.dto";
import { Mapper } from "../mapper"
import { InspectionEntity } from "../../entities/inspection.entity";


export class UpdateInspectionMapper extends Mapper<UpdateInspectionDto, InspectionEntity> {
  public mapFrom(data: UpdateInspectionDto): InspectionEntity {
    const inspection = new InspectionEntity()

   inspection.id = data.id
   inspection.appointmentId = data.appointmentId
   inspection.vehicleId = data.vehicleId;
   inspection.inspectionDate = data.inspectionDate;
   inspection.hasServiceOrder = data.hasServiceOrder;

    return inspection;
  }

  public mapTo(data: InspectionEntity): UpdateInspectionDto {
    const inspection = new UpdateInspectionDto()

    inspection.id = data.id
    inspection.appointmentId = data.appointmentId
    inspection.vehicleId = data.vehicleId;
    inspection.inspectionDate = data.inspectionDate;
    inspection.hasServiceOrder = data.hasServiceOrder;

    return inspection;
  }
}
