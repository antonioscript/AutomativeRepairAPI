import { ResponseServiceDto } from "../service/response-service.dto";

export class ResponseInspectionOnServiceDto {
    id: number;
    inspectionId: number
    serviceId: number
    service?: ResponseServiceDto
  }