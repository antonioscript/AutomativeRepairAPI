import { AppointmentStatusEntity } from "./appointmentStatus.entity";
import { BaseEntity } from "./base.entity"
import { CustomerEntity } from "./customer.entity";

export class AppointmentEntity extends BaseEntity {

    id: number;
    customerId: number;
    customer?: CustomerEntity;
    statusId: number;
    status?: AppointmentStatusEntity;
    inspectionDate: Date;
    observation?: string;
}
