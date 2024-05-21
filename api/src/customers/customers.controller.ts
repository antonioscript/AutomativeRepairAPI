import { Controller, Get, Post, Put, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateCustomerUseCase } from './create-customer.use-case';
import { GetAllCustomersUseCase } from './get-all-customers.use-case';
import { RequestCustomerDto } from './dto/request-customer.dto';
import { GetOneCustomerUseCase } from './get-one-customer.use-case';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly getAllCustomersUseCase: GetAllCustomersUseCase,
    private readonly getOneCustomerUseCase: GetOneCustomerUseCase

  ) {}

  @Post()
  async create(@Body() RequestCustomerDto: RequestCustomerDto) {
    return this.createCustomerUseCase.execute(RequestCustomerDto);
  }

  @Get()
  async findAll() {
    return this.getAllCustomersUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.getOneCustomerUseCase.execute(+id);
  }

  // @Put(':id')
  // async update(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
  //   return this.customersService.update(id, updateCustomerDto);
  // }



  // @Patch(':id')
  // updatePacth(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
  //   return this.customersService.update(+id, updateCustomerDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.customersService.remove(+id);
  // }
}
