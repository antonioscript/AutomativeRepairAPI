import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { RequestInspectionOnServiceDto } from '../inspectionOnService/request-InspectionOnService.dto';
export class RequestInspectionDto {

    @ApiProperty()
    @IsInt()
    appointmentId: number;

    @ApiProperty()
    @IsInt()
    vehicleId: number;

    @ApiProperty()
    @IsString()
    description: string;

    value: number;

    @ApiProperty({isArray: true,  type: RequestInspectionOnServiceDto})
    services?: RequestInspectionOnServiceDto[]
  
  }