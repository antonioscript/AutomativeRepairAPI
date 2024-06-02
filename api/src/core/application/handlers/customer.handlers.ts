import { CreateCustomerHandler } from "../use-cases/custumer/commands/create-customer.command";
import { DeleteCustomerHandler } from "../use-cases/custumer/commands/delete-customer.command";
import { UpdateCustomerHandler } from "../use-cases/custumer/commands/update-customer.command";
import { GetAllCustomersHandler } from "../use-cases/custumer/queries/get-all-customers.query";
import { GetOneCustomerHandler } from "../use-cases/custumer/queries/get-one-customer.query";
import { GetPagedCustomersHandler } from "../use-cases/custumer/queries/get-paged-customers.query";


export const CommandCustomerHandlers = [CreateCustomerHandler, UpdateCustomerHandler, DeleteCustomerHandler];
export const QueryCustomerHandlers = [GetAllCustomersHandler, GetPagedCustomersHandler, GetOneCustomerHandler];
