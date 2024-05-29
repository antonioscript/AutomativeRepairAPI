import { CustomerEntity } from "src/core/domain/entities/customer.entity";
import { IGenericRepository } from "../igeneric-repository";

export abstract class CustomerRepository extends IGenericRepository<CustomerEntity> {}