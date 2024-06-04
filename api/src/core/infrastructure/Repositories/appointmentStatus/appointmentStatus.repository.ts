import { AppointmentStatusEntity } from "src/core/domain/entities/appointmentStatus.entity";
import { IGenericRepository } from "../igeneric-repository";

export abstract class AppointmentStatusRepository extends IGenericRepository<AppointmentStatusEntity> {}