import { CreateAppointmentHandler } from "../use-cases/appointment/commands/create-appointment.command";
import { UpdateAppointmentHandler } from "../use-cases/appointment/commands/update-appointment.command";
import { GetAllAppointmentsHandler } from "../use-cases/appointment/queries/get-all-appointments.query";
import { GetOneAppointmentHandler } from "../use-cases/appointment/queries/get-one-appointment.query";
import { GetPagedAppointmentsHandler } from "../use-cases/appointment/queries/get-paged-appointments.query";

export const CommandAppointmentHandlers = [CreateAppointmentHandler, UpdateAppointmentHandler];
export const QueryAppointmentHandlers = [GetAllAppointmentsHandler, GetPagedAppointmentsHandler, GetOneAppointmentHandler];
