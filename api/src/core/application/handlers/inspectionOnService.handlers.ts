import { CreateInspectionOnServiceHandler } from "../use-cases/inspectionOnService/commands/create-inspectionOnService.command";
import { DeleteInspectionOnServiceHandler } from "../use-cases/inspectionOnService/commands/delete-inspectionOnService.command";
import { GetAllInspectionOnServicesHandler } from "../use-cases/inspectionOnService/queries/get-all-inspectionOnServices.query";
import { GetOneInspectionOnServiceHandler } from "../use-cases/inspectionOnService/queries/get-one-inspectionOnService.query";
import { GetPagedInspectionOnServicesHandler } from "../use-cases/inspectionOnService/queries/get-paged-inspectionOnServices.query";

export const CommandInspectionOnServiceHandlers = [CreateInspectionOnServiceHandler, DeleteInspectionOnServiceHandler];
export const QueryInspectionOnServiceHandlers = [GetAllInspectionOnServicesHandler, GetPagedInspectionOnServicesHandler, GetOneInspectionOnServiceHandler];
