import { RequestServiceDto } from "src/core/application/dtos/service/request-service.dto";
import { Mapper } from "../mapper"
import { ServiceEntity } from "../../entities/service.entity";

export class RequestServiceMapper extends Mapper<RequestServiceDto, ServiceEntity> {
  public mapFrom(data: RequestServiceDto): ServiceEntity {
    const service = new ServiceEntity()

    service.name = data.name;
    service.value = data.value;
    service.observation = data.observation;

    return service;
  }

  public mapTo(data: ServiceEntity): RequestServiceDto {
    const service = new RequestServiceDto()

    service.name = data.name;
    service.value = data.value;
    service.observation = data.observation;

    return service;
  }
}
