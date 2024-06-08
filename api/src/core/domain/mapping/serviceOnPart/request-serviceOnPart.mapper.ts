import { RequestServiceOnPartDto } from "src/core/application/dtos/serviceOnPart/request-serviceOnPart.dto";
import { ServiceOnPartEntity } from "../../entities/serviceOnPart.entity";
import { Mapper } from "../mapper"

export class RequestServiceOnPartMapper extends Mapper<RequestServiceOnPartDto, ServiceOnPartEntity> {
  public mapFrom(data: RequestServiceOnPartDto): ServiceOnPartEntity {
    const service = new ServiceOnPartEntity()

    service.serviceId = data.serviceId;
    service.partId = data.partId;

    return service;
  }

  public mapTo(data: ServiceOnPartEntity): RequestServiceOnPartDto {
    const service = new RequestServiceOnPartDto()
    
    service.serviceId = data.serviceId;
    service.partId = data.partId;

    return service;
  }
}
