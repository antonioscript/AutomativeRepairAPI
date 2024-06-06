import { InspectionEntity } from "src/core/domain/entities/inspection.entity";
import { IGenericRepository } from "../igeneric-repository";

export abstract class InspectionRepository extends IGenericRepository<InspectionEntity> {}