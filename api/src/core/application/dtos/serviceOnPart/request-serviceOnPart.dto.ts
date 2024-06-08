import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
export class RequestServiceOnPartDto {

  @ApiProperty()
  @IsNumber()
  serviceId: number;

  @ApiProperty()
  @IsNumber()
  partId: number;
}