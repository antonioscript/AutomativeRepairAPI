import { BaseEntity } from "./base.entity"

export class InspectionEntity extends BaseEntity {
    appointmentId: number
    //appointment?: AppointmentEntity

    vehicleId: number
    //vehicle?: VehicleEntity

    inspectionDate: Date;
    hasServiceOrder: boolean;
}
