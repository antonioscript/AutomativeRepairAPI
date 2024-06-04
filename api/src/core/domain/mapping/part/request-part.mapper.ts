import { RequestPartDto } from "src/core/application/dtos/part/request-part.dto";
import { PartEntity } from "../../entities/part.entity";
import { Mapper } from "../mapper"

export class RequestPartMapper extends Mapper<RequestPartDto, PartEntity> {
  public mapFrom(data: RequestPartDto): PartEntity {
    const part = new PartEntity()

    part.name = data.name;
    part.supplier = data.supplier;
    part.manufacturer = data.manufacturer;
    part.barcode = data.barcode;
    part.observation = data.observation;
    part.quantity = data.quantity;
    part.value = data.value;

    return part;
  }

  public mapTo(data: PartEntity): RequestPartDto {
    const part = new RequestPartDto()

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
