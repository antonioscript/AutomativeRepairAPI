import { ApiProperty } from '@nestjs/swagger';
import { IsInt} from 'class-validator';

export class RequestInspectionOnServiceDto {

    id: number;

    @IsInt()
    inspectionId: number

    @ApiProperty()
    @IsInt()
    serviceId: number
  }