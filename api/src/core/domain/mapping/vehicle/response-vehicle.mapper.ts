import { ResponseVehicleDto } from "src/core/application/dtos/vehicle/response-vehicle.dto"
import { VehicleEntity } from "../../entities/vehicle.entity"
import { Mapper } from "../mapper"



export class ResponseVehicleMapper extends Mapper<ResponseVehicleDto, VehicleEntity> {
  public mapFrom(data: ResponseVehicleDto): VehicleEntity {
    const vehicle = new VehicleEntity()

    vehicle.id = data.id
    vehicle.plate = data.plate

    vehicle.customerId = data.customerId
    //vehicle.customer = data.customer

    vehicle.vehicleTypeId = data.vehicleTypeId
    //vehicle.vehicleType = data.vehicleType

    vehicle.brand = data.brand
    vehicle.model = data.model
    vehicle.year = data.year

    return vehicle
  }

  public mapTo(data: VehicleEntity): ResponseVehicleDto {
    const vehicle = new ResponseVehicleDto()

    vehicle.id = data.id
    vehicle.plate = data.plate

    vehicle.customerId = data.customerId
    //vehicle.customer = data.customer

    vehicle.vehicleTypeId = data.vehicleTypeId
    //vehicle.vehicleType = data.vehicleType

    vehicle.brand = data.brand
    vehicle.model = data.model
    vehicle.year = data.year
    
    return vehicle
  }
}
