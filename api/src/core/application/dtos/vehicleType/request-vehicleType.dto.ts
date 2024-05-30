import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class RequestVehicleTypeDto {

    @ApiProperty()
    @IsString()
    name: string
}
