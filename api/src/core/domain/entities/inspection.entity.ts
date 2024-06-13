import { InspectionOnService } from "@prisma/client";
import { BaseEntity } from "./base.entity"
import { VehicleEntity } from "./vehicle.entity";

export class InspectionEntity extends BaseEntity {
    appointmentId: number

    vehicleId: number
    vehicle?: VehicleEntity

    inspectionDate: Date;
    hasServiceOrder: boolean;

    description: string

    value: number;
    isServiceOrder: boolean
    isClosed: boolean
    services?: InspectionOnService[] 
}
