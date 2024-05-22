import { IGenericRepository } from "./igeneric-repository";
import { CustomerEntity } from "src/domain/entities/customer.entity";

export abstract class CustomerRepository extends IGenericRepository<CustomerEntity> {}