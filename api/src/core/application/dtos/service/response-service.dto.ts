import { ResponseServiceOnPartDto } from "../serviceOnPart/response-serviceOnPart.dto";

export class ResponseServiceDto {
    id?: number;
    name: string;
    value: number;
    observation?: string;

    parts?: ResponseServiceOnPartDto[];
  }