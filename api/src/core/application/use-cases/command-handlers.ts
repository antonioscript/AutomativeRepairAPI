import { CreateCustomerHandler } from "./custumer/commands/create-customer.command";
import { DeleteCustomerHandler } from "./custumer/commands/delete-customer.use-command";
import { UpdateCustomerHandler } from "./custumer/commands/update-customer.use-command";

export const CommandHandlers = [CreateCustomerHandler, UpdateCustomerHandler, DeleteCustomerHandler];
