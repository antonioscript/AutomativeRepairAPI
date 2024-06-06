import { BaseEntity } from "./base.entity"
import { ServiceEntity } from "./service.entity";

export class PartEntity extends BaseEntity {
    serviceId: number
    //service?: ServiceEntity

    name: string;
    supplier?: string;
    manufacturer?: string;
    barcode?: string;
    observation?: string;
    quantity: number;
    value: number;
}
