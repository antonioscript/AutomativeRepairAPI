import { ResponsePartDto } from "../part/response-part.dto";

export class ResponseServiceOnPartDto {
    id: number;
    serviceId: number;

    partId: number;
    part?: ResponsePartDto
  }