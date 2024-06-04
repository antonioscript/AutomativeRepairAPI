import { AppointmentEntity } from "src/core/domain/entities/appointment.entity";
import { IGenericRepository } from "../igeneric-repository";

export abstract class AppointmentRepository extends IGenericRepository<AppointmentEntity> {}