import { ApiProperty } from '@nestjs/swagger';
import { IsInt} from 'class-validator';

export class RequestInspectionOnServiceDto {

    id: number;

    @ApiProperty()
    @IsInt()
    inspectionId: number

    @ApiProperty()
    @IsInt()
    serviceId: number
  }