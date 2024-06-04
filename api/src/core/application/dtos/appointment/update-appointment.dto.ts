import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateAppointmentDto{
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsInt()
    customerId: number;

    @ApiProperty()
    @IsInt()
    statusId: number;

    @ApiProperty()
    @IsDateString()
    inspectionDate: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    observation?: string;
}
