import { UpdateServiceDto } from "src/core/application/dtos/service/update-service.dto";
import { ServiceEntity } from "../../entities/service.entity";
import { Mapper } from "../mapper"


export class UpdateServiceMapper extends Mapper<UpdateServiceDto, ServiceEntity> {
  public mapFrom(data: UpdateServiceDto): ServiceEntity {
    const service = new ServiceEntity()

    service.id = data.id
    service.name = data.name;
    service.value = data.value;
    service.observation = data.observation;

    return service;
  }

  public mapTo(data: ServiceEntity): UpdateServiceDto {
    const service = new UpdateServiceDto()

    service.id = data.id
    service.name = data.name;
    service.value = data.value;
    service.observation = data.observation;

    return service;
  }
}
