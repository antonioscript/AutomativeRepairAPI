import { BaseEntity } from "./base.entity"

export class PartEntity extends BaseEntity {
    name: string;
    supplier?: string;
    manufacturer?: string;
    barcode?: string;
    observation?: string;
    quantity: number;
    value: number;
}
