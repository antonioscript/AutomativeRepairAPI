import { CreateAppointmentStatusHandler } from "../use-cases/appointmentStatus/commands/create-appointmentStatus.command";
import { DeleteAppointmentStatusHandler } from "../use-cases/appointmentStatus/commands/delete-appointmentStatus.command";
import { UpdateAppointmentStatusHandler } from "../use-cases/appointmentStatus/commands/update-appointmentStatus.command";
import { GetAllAppointmentStatusHandler } from "../use-cases/appointmentStatus/queries/get-all-appointmentSatus.query";
import { GetOneAppointmentStatusHandler } from "../use-cases/appointmentStatus/queries/get-one-appointmentStatus.query";
import { GetPagedAppointmentStatusHandler } from "../use-cases/appointmentStatus/queries/get-paged-appointmentStatus.query";

export const CommandAppointmentStatusHandlers = [CreateAppointmentStatusHandler, UpdateAppointmentStatusHandler, DeleteAppointmentStatusHandler];
export const QueryAppointmentStatusHandlers = [GetAllAppointmentStatusHandler, GetPagedAppointmentStatusHandler, GetOneAppointmentStatusHandler];
