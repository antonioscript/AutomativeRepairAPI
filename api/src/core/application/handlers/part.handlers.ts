import { CreatePartHandler } from "../use-cases/part/commands/create-part.command";
import { DeletePartHandler } from "../use-cases/part/commands/delete-part.command";
import { UpdatePartHandler } from "../use-cases/part/commands/update-part.command";
import { GetAllPartsHandler } from "../use-cases/part/queries/get-all-parts.query";
import { GetOnePartHandler } from "../use-cases/part/queries/get-one-part.query";
import { GetPagedPartsHandler } from "../use-cases/part/queries/get-paged-parts.query";

export const CommandPartHandlers = [CreatePartHandler, UpdatePartHandler, DeletePartHandler];
export const QueryPartHandlers = [GetAllPartsHandler, GetPagedPartsHandler, GetOnePartHandler];
