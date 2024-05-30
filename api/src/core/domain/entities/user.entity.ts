import { BaseEntity } from "./base.entity"

export class UserEntity extends BaseEntity {

    name: string
    email: string
    password: string
    createdAt: Date
    updatetAd: Date
}
