import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { RequestServiceOnPartDto } from '../serviceOnPart/request-serviceOnPart.dto';
export class RequestServiceDto {
  
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  value: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  observation?: string;

  @ApiProperty({isArray: true,  type: RequestServiceOnPartDto})
  parts?: RequestServiceOnPartDto[];
}