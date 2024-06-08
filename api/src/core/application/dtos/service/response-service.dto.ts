import { ResponsePartDto } from "../part/response-part.dto";

export class ResponseServiceDto {
    id?: number;
    name: string;
    value: number;
    observation?: string;

    //parts?: ResponsePartDto[];
  }