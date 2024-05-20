import { IGenericRepository } from "./igeneric-repository";
import { CustomerEntity } from "src/customers/entities/customer.entity";

export abstract class CustomerRepository extends IGenericRepository<CustomerEntity> {}