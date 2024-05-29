import { VehicleTypeEntity } from "src/core/domain/entities/vehicleType.entity";
import { IGenericRepository } from "./igeneric-repository";

export abstract class VehicleTypeRepository extends IGenericRepository<VehicleTypeEntity> {}