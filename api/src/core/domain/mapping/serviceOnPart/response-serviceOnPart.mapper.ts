import { ResponseServiceOnPartDto } from "src/core/application/dtos/serviceOnPart/response-serviceOnPart.dto";
import { ServiceOnPartEntity } from "../../entities/serviceOnPart.entity";
import { Mapper } from "../mapper"

export class ResponseServiceOnPartMapper extends Mapper<ResponseServiceOnPartDto, ServiceOnPartEntity> {
  public mapFrom(data: ResponseServiceOnPartDto): ServiceOnPartEntity {
    const service = new ServiceOnPartEntity()

    service.id = data.id
    service.serviceId = data.serviceId;
    service.partId = data.partId;

    return service;
  }

  public mapTo(data: ServiceOnPartEntity): ResponseServiceOnPartDto {
    const service = new ResponseServiceOnPartDto()

    service.id = data.id
    service.serviceId = data.serviceId;
    service.partId = data.partId;
    
    return service
  }
}
