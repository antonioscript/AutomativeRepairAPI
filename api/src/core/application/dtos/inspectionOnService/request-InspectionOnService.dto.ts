import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsNumber } from 'class-validator';
export class RequestInspectionOnServiceDto {
    @ApiProperty()
    @IsInt()
    inspectionId: number

    @ApiProperty()
    @IsInt()
    serviceId: number
  }