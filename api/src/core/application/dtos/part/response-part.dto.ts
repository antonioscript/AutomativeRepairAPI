import { ResponseAppointmentStatusDto } from "../appointmentStatus/response-appointmentStatusdto";
import { ResponseCustomerDto } from "../customer/response-customer.dto";

export class ResponsePartDto {
    id?: number;
    //serviceId: number;
    name: string;
    supplier?: string;
    manufacturer?: string;
    barcode?: string;
    observation?: string;
    quantity: number;
    value: number;
  }