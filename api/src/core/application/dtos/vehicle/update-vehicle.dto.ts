import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class UpdateVehicleDto{
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    plate: string

    @ApiProperty()
    @IsInt()
    customerId: number

    @ApiProperty()
    @IsInt()
    vehicleTypeId: number;

    @ApiProperty({required: false})
    @IsString()
    brand?: string

    @ApiProperty({required: false})
    @IsString()
    model?: string

    @ApiProperty({required: false})
    @IsInt()
    year?: number
}
