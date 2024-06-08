import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsString } from 'class-validator';

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
    @IsString()
    description: string;
  
    @ApiProperty()
    @IsDateString()
    inspectionDate: Date;
    
    @ApiProperty()
    @IsBoolean()
    hasServiceOrder: boolean;

    value: number;
}
