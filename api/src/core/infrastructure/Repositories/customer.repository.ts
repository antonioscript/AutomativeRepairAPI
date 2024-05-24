import { IGenericRepository } from "./igeneric-repository";
import { CustomerEntity } from "src/core/domain/entities/customer.entity";

export abstract class CustomerRepository extends IGenericRepository<CustomerEntity> {}