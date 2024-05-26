import { PartialType } from '@nestjs/mapped-types';
import { RequestCustomerDto } from './request-customer.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class UpdateCustomerDto{
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    lastName: string   

    @ApiProperty({required: true})
    @IsString()
    cpf: string  
}
