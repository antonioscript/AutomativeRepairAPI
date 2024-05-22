import { Controller, Get, Post, Put, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateCustomerUseCase } from 'src/application/use-cases/custumer/create-customer.use-case';
import { UpdateCustomerUseCase } from 'src/application/use-cases/custumer/update-customer.use-case';
import { GetAllCustomersUseCase } from 'src/application/use-cases/custumer/get-all-customers.use-case';
import { GetOneCustomerUseCase } from 'src/application/use-cases/custumer/get-one-customer.use-case';
import { DeleteCustomerUseCase } from 'src/application/use-cases/custumer/delete-customer.use-case';
import { RequestCustomerDto } from 'src/application/dtos/customer/request-customer.dto';
import { UpdateCustomerDto } from 'src/application/dtos/customer/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
    private readonly getAllCustomersUseCase: GetAllCustomersUseCase,
    private readonly getOneCustomerUseCase: GetOneCustomerUseCase,
    private readonly deleteCustomerUseCase: DeleteCustomerUseCase,

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
  async findOne(@Param('id') id: number) {
    return this.getOneCustomerUseCase.execute(+id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    const parsedNumberId = Number(id);
    return this.updateCustomerUseCase.execute(parsedNumberId, updateCustomerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const parsedNumberId = Number(id);
    await this.deleteCustomerUseCase.execute(parsedNumberId)
  }
}
