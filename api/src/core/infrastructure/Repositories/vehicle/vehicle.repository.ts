import { IGenericRepository } from "../igeneric-repository";
import { VehicleEntity } from "src/core/domain/entities/vehicle.entity";

export abstract class VehicleRepository extends IGenericRepository<VehicleEntity> {}