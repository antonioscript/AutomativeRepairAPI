import { GetAllCustomersHandler } from "./custumer/queries/get-all-customers.use-case";
import { GetOneCustomersHandler } from "./custumer/queries/get-one-customers.query";

export const QueryHandlers = [GetAllCustomersHandler, GetOneCustomersHandler];
