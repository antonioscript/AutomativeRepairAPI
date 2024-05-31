import { IGenericRepository } from "../igeneric-repository";
import { UserEntity } from "src/core/domain/entities/user.entity";

export abstract class UserRepository extends IGenericRepository<UserEntity> {

    abstract login(email: string, password: string);

    abstract forget(email: string);

    abstract reset(password: string, token: string);
}