import { IGenericRepository } from "../igeneric-repository";
import { UserEntity } from "src/core/domain/entities/user.entity";

export abstract class UserRepository extends IGenericRepository<UserEntity> {}