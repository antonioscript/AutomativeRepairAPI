import { BaseEntity } from "./base.entity"
import { CustomerEntity } from "./customer.entity"
import { VehicleTypeEntity } from "./vehicleType.entity"

export class VehicleEntity extends BaseEntity {
    plate: string

    customerId: number
    //customer: CustomerEntity

    vehicleTypeId: number;
    //vehicleType: VehicleTypeEntity;

    brand?: string
    model?: string
    year?: number
}
