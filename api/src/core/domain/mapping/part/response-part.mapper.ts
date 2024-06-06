import { ResponsePartDto } from "src/core/application/dtos/part/response-part.dto";
import { Mapper } from "../mapper"
import { PartEntity } from "../../entities/part.entity";



export class ResponsePartMapper extends Mapper<ResponsePartDto, PartEntity> {
  public mapFrom(data: ResponsePartDto): PartEntity {
    const part = new PartEntity()

    part.id = data.id
    part.serviceId = data.serviceId
    part.name = data.name;
    part.supplier = data.supplier;
    part.manufacturer = data.manufacturer;
    part.barcode = data.barcode;
    part.observation = data.observation;
    part.quantity = data.quantity;
    part.value = data.value;

    return part;
  }

  public mapTo(data: PartEntity): ResponsePartDto {
    const part = new ResponsePartDto()

    part.id = data.id
    part.serviceId = data.serviceId
    part.name = data.name;
    part.supplier = data.supplier;
    part.manufacturer = data.manufacturer;
    part.barcode = data.barcode;
    part.observation = data.observation;
    part.quantity = data.quantity;
    part.value = data.value;
    
    return part
  }
}
