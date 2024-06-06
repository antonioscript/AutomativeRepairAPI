import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt } from 'class-validator';

export class UpdateInspectionDto{
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsInt()
    appointmentId: number;

    @ApiProperty()
    @IsInt()
    vehicleId: number;
  
    @ApiProperty()
    @IsDateString()
    inspectionDate: Date;
  
    @ApiProperty()
    @IsBoolean()
    hasServiceOrder: boolean;
}
