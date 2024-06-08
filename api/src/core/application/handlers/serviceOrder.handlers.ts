import { CloseServiceOrderHandler } from "../use-cases/serviceOrder/commands/close-serviceOrder.command";
import { CreateServiceOrderHandler } from "../use-cases/serviceOrder/commands/create-serviceOrder.command";


export const CommandServiceOrderHandlers = [ CreateServiceOrderHandler, CloseServiceOrderHandler];
