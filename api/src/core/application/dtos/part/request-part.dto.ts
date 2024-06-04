import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDateString, IsOptional, IsNumber } from 'class-validator';
export class RequestPartDto {
    @ApiProperty()
    @IsString()
    name: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    supplier?: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    manufacturer?: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    barcode?: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    observation?: string;
  
    @ApiProperty()
    @IsInt()
    quantity: number;
  
    @ApiProperty()
    @IsNumber()
    value: number;
  }