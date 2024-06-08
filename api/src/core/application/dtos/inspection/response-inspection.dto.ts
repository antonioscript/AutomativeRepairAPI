import { ResponseInspectionOnServiceDto } from "../inspectionOnService/response-InspectionOnService.dto";

export class ResponseInspectionDto {
    id?: number;
    appointmentId: number


    vehicleId: number

    inspectionDate: Date;
    hasServiceOrder: boolean;
    value: number;

    services?: ResponseInspectionOnServiceDto[]
  }