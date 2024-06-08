import { BaseEntity } from "./base.entity";

export class ServiceEntity extends BaseEntity {
    name: string;
    value: number;
    observation?: string;
    //parts?: PartEntity[];
}
