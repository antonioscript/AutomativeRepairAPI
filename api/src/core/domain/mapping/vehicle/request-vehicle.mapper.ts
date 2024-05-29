import { VehicleEntity } from "src/core/domain/entities/Vehicle.entity"
import { Mapper } from "../mapper"
import { RequestVehicleDto } from "src/core/application/dtos/vehicle/request-vehicle.dto"

export class RequestVehicleMapper extends Mapper<RequestVehicleDto, VehicleEntity> {
  public mapFrom(data: RequestVehicleDto): VehicleEntity {
    const vehicle = new VehicleEntity()

    vehicle.plate = data.plate
    vehicle.customerId = data.customerId
    vehicle.vehicleTypeId = data.vehicleTypeId
    vehicle.brand = data.brand
    vehicle.model = data.model
    vehicle.year = data.year

    return vehicle
  }

  public mapTo(data: VehicleEntity): RequestVehicleDto {
    const vehicle = new RequestVehicleDto()

    vehicle.plate = data.plate
    vehicle.customerId = data.customerId
    vehicle.vehicleTypeId = data.vehicleTypeId
    vehicle.brand = data.brand
    vehicle.model = data.model
    vehicle.year = data.year

    return vehicle
  }
}
