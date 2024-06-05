import { CreateServiceHandler } from "../use-cases/service/commands/create-service.command";
import { DeleteServiceHandler } from "../use-cases/service/commands/delete-service.command";
import { UpdateServiceHandler } from "../use-cases/service/commands/update-service.command";
import { GetAllServicesHandler } from "../use-cases/service/queries/get-all-services.query";
import { GetOneServiceHandler } from "../use-cases/service/queries/get-one-service.query";
import { GetPagedServicesHandler } from "../use-cases/service/queries/get-paged-services.query";

export const CommandServiceHandlers = [CreateServiceHandler, UpdateServiceHandler, DeleteServiceHandler];
export const QueryServiceHandlers = [GetAllServicesHandler, GetPagedServicesHandler, GetOneServiceHandler];
