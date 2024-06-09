import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Matches } from 'class-validator';
import { constants } from 'src/core/infrastructure/Shared/constants';
import { messages } from 'src/core/infrastructure/Shared/messages';
export class RequestVehicleDto {

    id?: number

    @ApiProperty()
    @IsInt()
    customerId: number

    @ApiProperty()
    @IsString()
    @Matches(constants.REGEX_PLATE, {message: messages.PLATE_TYPE})
    plate: string

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
