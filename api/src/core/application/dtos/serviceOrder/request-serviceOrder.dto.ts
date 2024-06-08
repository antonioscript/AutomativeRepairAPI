import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsString } from 'class-validator';

export class RequestServiceOrderDto{
    id: number;

    @ApiProperty()
    inspectionId: number

    appointmentId: number;



    vehicleId: number;



    description: string;
  


    inspectionDate: Date;
    


    hasServiceOrder: boolean;

    isServiceOrder: boolean
    isClosed: boolean;

    value: number;
}
