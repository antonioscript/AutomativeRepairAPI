import { ResponseAppointmentStatusDto } from "../appointmentStatus/response-appointmentStatusdto";
import { ResponseCustomerDto } from "../customer/response-customer.dto";

export class ResponseAppointmentDto {
    id?: number
    customerId: number;
    customer: ResponseCustomerDto;
    statusId: number;
    status: ResponseAppointmentStatusDto;
    inspectionDate: Date;
    observation?: string;
}
