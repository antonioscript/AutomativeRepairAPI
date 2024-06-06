import { UpdateInspectionOnServiceDto } from "src/core/application/dtos/inspectionOnService/update-InspectionOnService.dto";
import { Mapper } from "../mapper"
import { InspectionOnServiceEntity } from "../../entities/inspectionOnService.entity";


export class UpdateInspectionOnServiceMapper extends Mapper<UpdateInspectionOnServiceDto, InspectionOnServiceEntity> {
  public mapFrom(data: UpdateInspectionOnServiceDto): InspectionOnServiceEntity {
    const inspectionOnService = new InspectionOnServiceEntity()

    inspectionOnService.id = data.id
    inspectionOnService.inspectionId = data.inspectionId
    inspectionOnService.serviceId = data.serviceId;

    return inspectionOnService;
  }

  public mapTo(data: InspectionOnServiceEntity): UpdateInspectionOnServiceDto {
    const inspectionOnService = new UpdateInspectionOnServiceDto()

    inspectionOnService.id = data.id
    inspectionOnService.inspectionId = data.inspectionId
    inspectionOnService.serviceId = data.serviceId;

    return inspectionOnService;
  }
}
