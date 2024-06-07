import { BaseEntity } from "./base.entity"
import { ServiceEntity } from "./service.entity";

export class InspectionOnServiceEntity extends BaseEntity {
    
    inspectionId: number
    serviceId: number
    service?: ServiceEntity
}
