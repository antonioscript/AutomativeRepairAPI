import { UpdateVehicleDto } from "src/core/application/dtos/vehicle/update-vehicle.dto"
import { VehicleEntity } from "../../entities/vehicle.entity"
import { Mapper } from "../mapper"

export class UpdateVehicleMapper extends Mapper<UpdateVehicleDto, VehicleEntity> {
  public mapFrom(data: UpdateVehicleDto): VehicleEntity {
    const vehicle = new VehicleEntity()

    vehicle.id = data.id 
    vehicle.plate = data.plate
    vehicle.customerId = data.customerId
    vehicle.vehicleTypeId = data.vehicleTypeId
    vehicle.brand = data.brand
    vehicle.model = data.model
    vehicle.year = data.year

    return vehicle
  }

  public mapTo(data: VehicleEntity): UpdateVehicleDto {
    const vehicle = new UpdateVehicleDto()

    vehicle.id = data.id 
    vehicle.plate = data.plate
    vehicle.customerId = data.customerId
    vehicle.vehicleTypeId = data.vehicleTypeId
    vehicle.brand = data.brand
    vehicle.model = data.model
    vehicle.year = data.year


    return vehicle
  }
}
