import { ServiceEntity } from "src/core/domain/entities/service.entity";
import { IGenericRepository } from "../igeneric-repository";

export abstract class ServiceRepository extends IGenericRepository<ServiceEntity> {}