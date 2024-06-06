import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber } from 'class-validator';

export class UpdateInspectionOnServiceDto{
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsInt()
    serviceId: number
    
    @ApiProperty()
    @IsInt()
    inspectionId: number
}
