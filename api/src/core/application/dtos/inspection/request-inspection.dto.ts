import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { RequestInspectionOnServiceDto } from '../inspectionOnService/request-InspectionOnService.dto';
export class RequestInspectionDto {

    @ApiProperty()
    @IsInt()
    appointmentId: number;

    @ApiProperty()
    @IsInt()
    vehicleId: number;

    @ApiProperty({isArray: true,  type: RequestInspectionOnServiceDto})
    services?: RequestInspectionOnServiceDto[]
  
  }