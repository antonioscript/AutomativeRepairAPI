import { CreateInspectionHandler } from "../use-cases/inspection/commands/create-inspection.command";
import { DeleteInspectionHandler } from "../use-cases/inspection/commands/delete-inspection.command";
import { UpdateInspectionHandler } from "../use-cases/inspection/commands/update-inspection.command";
import { GetAllInspectionsHandler } from "../use-cases/inspection/queries/get-all-inspections.query";
import { GetOneInspectionHandler } from "../use-cases/inspection/queries/get-one-inspection.query";
import { GetPagedInspectionsHandler } from "../use-cases/inspection/queries/get-paged-inspections.query";

export const CommandInspectionHandlers = [CreateInspectionHandler, UpdateInspectionHandler, DeleteInspectionHandler];
export const QueryInspectionHandlers = [GetAllInspectionsHandler, GetPagedInspectionsHandler, GetOneInspectionHandler];
