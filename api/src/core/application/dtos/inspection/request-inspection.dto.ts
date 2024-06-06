import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDateString, IsBoolean } from 'class-validator';
export class RequestInspectionDto {
    @ApiProperty()
    @IsInt()
    appointmentId: number;

    @ApiProperty()
    @IsInt()
    vehicleId: number;
  
    // @ApiProperty()
    // @IsDateString()
    // inspectionDate: Date;
  
    // @ApiProperty()
    // @IsBoolean()
    // hasServiceOrder: boolean;
  
  }