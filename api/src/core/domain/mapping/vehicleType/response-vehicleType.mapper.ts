import { ResponseVehicleTypeDto } from "src/core/application/dtos/vehicleType/response-vehicleType.dto"
import { VehicleTypeEntity } from "../../entities/vehicleType.entity"
import { Mapper } from "../mapper"



export class ResponseVehicleTypeMapper extends Mapper<ResponseVehicleTypeDto, VehicleTypeEntity> {
  public mapFrom(data: ResponseVehicleTypeDto): VehicleTypeEntity {
    const vehicleType = new VehicleTypeEntity()

    vehicleType.id = data.id
    vehicleType.name = data.name

    return vehicleType
  }

  public mapTo(data: VehicleTypeEntity): ResponseVehicleTypeDto {
    const vehicleType = new ResponseVehicleTypeDto()

    vehicleType.id = data.id
    vehicleType.name = data.name
    
    return vehicleType
  }
}
