import { BaseEntity } from "./base.entity";
import { PartEntity } from "./part.entity";

export class ServiceOnPartEntity extends BaseEntity {
    serviceId: number;
    
    partId: number;
    parts?: PartEntity
}
