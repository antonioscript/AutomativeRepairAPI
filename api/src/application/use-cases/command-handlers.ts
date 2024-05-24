import { CreateCustomerHandler } from "./custumer/commands/create-customer.use-case";
import { DeleteCustomerHandler } from "./custumer/commands/delete-customer.use-case";
import { UpdateCustomerHandler } from "./custumer/commands/update-customer.use-case";

export const CommandHandlers = [CreateCustomerHandler, UpdateCustomerHandler, DeleteCustomerHandler];
