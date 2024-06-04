import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDateString, IsOptional } from 'class-validator';
export class RequestAppointmentStatusDto {
    @ApiProperty()
    @IsString()
    name: string;
}