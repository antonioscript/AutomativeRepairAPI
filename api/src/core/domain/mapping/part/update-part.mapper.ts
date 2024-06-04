import { UpdatePartDto } from "src/core/application/dtos/part/update-part.dto";
import { PartEntity } from "../../entities/part.entity";
import { Mapper } from "../mapper"


export class UpdatePartMapper extends Mapper<UpdatePartDto, PartEntity> {
  public mapFrom(data: UpdatePartDto): PartEntity {
    const part = new PartEntity()

    part.id = data.id
    part.name = data.name;
    part.supplier = data.supplier;
    part.manufacturer = data.manufacturer;
    part.barcode = data.barcode;
    part.observation = data.observation;
    part.quantity = data.quantity;
    part.value = data.value;

    return part;
  }

  public mapTo(data: PartEntity): UpdatePartDto {
    const part = new UpdatePartDto()

    part.id = data.id
    part.name = data.name;
    part.supplier = data.supplier;
    part.manufacturer = data.manufacturer;
    part.barcode = data.barcode;
    part.observation = data.observation;
    part.quantity = data.quantity;
    part.value = data.value;

    return part;
  }
}
