import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePartDto{
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsInt()
    serviceId: number;

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
