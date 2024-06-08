import { ResponseCustomerDto } from "../customer/response-customer.dto";
import { ResponseVehicleTypeDto } from "../vehicleType/response-vehicleType.dto";

export class ResponseVehicleDto {
    id?: number;
    plate: string

    customerId: number
    customer?: ResponseCustomerDto

    vehicleTypeId: number;
    vehicleType?: ResponseVehicleTypeDto;

    brand?: string
    model?: string
    year?: number
}
