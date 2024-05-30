import { VehicleTypeEntity } from "src/core/domain/entities/VehicleType.entity"
import { Mapper } from "../mapper"
import { RequestVehicleTypeDto } from "src/core/application/dtos/vehicleType/request-vehicleType.dto"

export class RequestVehicleTypeMapper extends Mapper<RequestVehicleTypeDto, VehicleTypeEntity> {
  public mapFrom(data: RequestVehicleTypeDto): VehicleTypeEntity {
    const vehicleType = new VehicleTypeEntity()

    vehicleType.name = data.name

    return vehicleType
  }

  public mapTo(data: VehicleTypeEntity): RequestVehicleTypeDto {
    const vehicleType = new RequestVehicleTypeDto()

    vehicleType.name = data.name

    return vehicleType
  }
}
