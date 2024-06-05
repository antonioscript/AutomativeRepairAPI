import { BaseEntity } from "./base.entity";
import { PartEntity } from "./part.entity";

export class ServiceEntity extends BaseEntity {
    name: string;
    value: number;
    observation?: string;
    //parts: PartEntity[];
}
