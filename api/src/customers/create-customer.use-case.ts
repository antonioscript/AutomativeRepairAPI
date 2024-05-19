import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/database/prisma.service';
import { CreatedCustomerDto } from './dto/created-customer.dto';
import { UseCase } from 'src/base/use-case';
import { CreateCustomerMapper } from 'src/base/create-customer.mapper';
import { CreatedCustomerMapper } from 'src/base/created-customer.mapper';
import { CustomerRepository } from 'src/base/customer.repository';


export class CreateCustomerUseCase implements UseCase<CreatedCustomerDto> {
  private CreateUserMapper: CreateCustomerMapper
  private CreatedUserMapper: CreatedCustomerMapper

  constructor(private readonly repository: CustomerRepository) {
    this.CreateUserMapper = new CreateCustomerMapper()
    this.CreatedUserMapper = new CreatedCustomerMapper()
  }

  public async execute(customer: CreateCustomerDto): Promise<CreatedCustomerDto> {
    const entity = this.CreateUserMapper.mapFrom(customer)
    const createdCustomer = await this.repository.create(entity)
    return this.CreatedUserMapper.mapTo(createdCustomer)
  }
}
