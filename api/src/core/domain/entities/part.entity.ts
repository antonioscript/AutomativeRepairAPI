import { AppointmentStatusEntity } from "./appointmentStatus.entity";
import { BaseEntity } from "./base.entity"
import { CustomerEntity } from "./customer.entity";

export class PartEntity extends BaseEntity {
    name: string;
    supplier?: string;
    manufacturer?: string;
    barcode?: string;
    observation?: string;
    quantity: number;
    value: number;
}
