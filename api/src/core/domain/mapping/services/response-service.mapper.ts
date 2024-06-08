import { ResponseServiceDto } from "src/core/application/dtos/service/response-service.dto";
import { Mapper } from "../mapper"
import { ServiceEntity } from "../../entities/service.entity";

export class ResponseServiceMapper extends Mapper<ResponseServiceDto, ServiceEntity> {
  public mapFrom(data: ResponseServiceDto): ServiceEntity {
    const service = new ServiceEntity()

    service.id = data.id
    service.name = data.name;
    service.value = data.value;
    service.observation = data.observation;

    //service.parts = data.parts;

    return service;
  }

  public mapTo(data: ServiceEntity): ResponseServiceDto {
    const service = new ResponseServiceDto()

    service.id = data.id
    service.name = data.name;
    service.value = data.value;
    service.observation = data.observation;

    //service.parts = data.parts;
    
    return service
  }
}
