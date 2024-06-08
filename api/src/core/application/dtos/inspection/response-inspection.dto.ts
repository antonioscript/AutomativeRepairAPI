import { ResponseInspectionOnServiceDto } from "../inspectionOnService/response-InspectionOnService.dto";
import { ResponseVehicleDto } from "../vehicle/response-vehicle.dto";

export class ResponseInspectionDto {
    id?: number;
    appointmentId: number


    vehicleId: number
    vehicle?: ResponseVehicleDto

    inspectionDate: Date;
    hasServiceOrder: boolean;
    value: number;

    services?: ResponseInspectionOnServiceDto[]
  }