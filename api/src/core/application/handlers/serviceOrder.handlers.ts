import { CloseServiceOrderHandler } from "../use-cases/serviceOrder/commands/close-serviceOrder.command";
import { CreateServiceOrderHandler } from "../use-cases/serviceOrder/commands/create-serviceOrder.command";
import { GetAllServiceOrdersHandler } from "../use-cases/serviceOrder/queries/get-all-serviceOrders.query";
import { GetOneServiceOrderHandler, GetOneServiceOrderQuery } from "../use-cases/serviceOrder/queries/get-one-serviceOrders.query";
import { GetPagedServiceOrdersHandler } from "../use-cases/serviceOrder/queries/get-paged-serviceOrders.query";


export const CommandServiceOrderHandlers = [ CreateServiceOrderHandler, CloseServiceOrderHandler];
export const QueryServiceOrderHandlers = [GetAllServiceOrdersHandler, GetOneServiceOrderHandler, GetPagedServiceOrdersHandler];
