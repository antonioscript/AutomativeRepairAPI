import { ServiceOnPartEntity } from "src/core/domain/entities/serviceOnPart.entity";
import { IGenericRepository } from "../igeneric-repository";

export abstract class ServiceOnPartRepository extends IGenericRepository<ServiceOnPartEntity> {}