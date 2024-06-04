import { PartEntity } from "src/core/domain/entities/part.entity";
import { IGenericRepository } from "../igeneric-repository";

export abstract class PartRepository extends IGenericRepository<PartEntity> {}