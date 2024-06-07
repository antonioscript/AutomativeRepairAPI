import { InspectionOnService } from "@prisma/client";
import { BaseEntity } from "./base.entity"

export class InspectionEntity extends BaseEntity {
    appointmentId: number

    vehicleId: number

    inspectionDate: Date;
    hasServiceOrder: boolean;

    services?: InspectionOnService[] 
}
