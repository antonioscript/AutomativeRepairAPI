import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDateString, IsOptional } from 'class-validator';
export class RequestAppointmentDto {
    @ApiProperty()
    @IsInt()
    customerId: number;

    statusId: number;

    @ApiProperty()
    @IsDateString()
    inspectionDate: Date;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    observation?: string;
}
