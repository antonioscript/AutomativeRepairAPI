import { CreateServiceOnPartHandler } from "../use-cases/serviceOnPart/commands/create-serviceOnPart.command";
import { DeleteServiceOnPartHandler } from "../use-cases/serviceOnPart/commands/delete-serviceOnPart.command";
import { GetAllServiceOnPartsHandler } from "../use-cases/serviceOnPart/queries/get-all-serviceOnParts.query";
import { GetOneServiceOnPartHandler } from "../use-cases/serviceOnPart/queries/get-one-serviceOnParts.query";
import { GetPagedServiceOnPartsHandler } from "../use-cases/serviceOnPart/queries/get-paged-serviceOnParts.query";


export const CommandServiceOnPartHandlers = [CreateServiceOnPartHandler, DeleteServiceOnPartHandler];
export const QueryServiceOnPartHandlers = [GetAllServiceOnPartsHandler, GetPagedServiceOnPartsHandler, GetOneServiceOnPartHandler];
