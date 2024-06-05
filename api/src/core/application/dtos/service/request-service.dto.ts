import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
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
}