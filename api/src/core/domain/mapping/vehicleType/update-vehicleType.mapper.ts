import { UpdateVehicleTypeDto } from "src/core/application/dtos/vehicleType/update-vehicleType.dto"
import { VehicleTypeEntity } from "../../entities/vehicleType.entity"
import { Mapper } from "../mapper"

export class UpdateVehicleTypeMapper extends Mapper<UpdateVehicleTypeDto, VehicleTypeEntity> {
  public mapFrom(data: UpdateVehicleTypeDto): VehicleTypeEntity {
    const customer = new VehicleTypeEntity()

    customer.id = data.id // TODO: Verificar
    customer.name = data.name

    return customer
  }

  public mapTo(data: VehicleTypeEntity): UpdateVehicleTypeDto {
    const customer = new UpdateVehicleTypeDto()

    customer.id = data.id
    customer.name = data.name


    return customer
  }
}
