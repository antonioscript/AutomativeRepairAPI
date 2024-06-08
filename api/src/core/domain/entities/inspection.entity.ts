import { InspectionOnService } from "@prisma/client";
import { BaseEntity } from "./base.entity"

export class InspectionEntity extends BaseEntity {
    appointmentId: number

    vehicleId: number

    inspectionDate: Date;
    hasServiceOrder: boolean;

    description: string

    value: number;
    isServiceOrder: boolean
    isClosed: boolean
    services?: InspectionOnService[] 
}
