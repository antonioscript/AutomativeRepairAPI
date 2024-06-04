import { BaseEntity } from "./base.entity";
import { AppointmentEntity } from "./appointment.entity";

export class AppointmentStatusEntity extends BaseEntity {
    name: string;
    //appointments: AppointmentEntity[];
}
