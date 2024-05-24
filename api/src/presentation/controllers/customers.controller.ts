import { Controller, Get, Post, Put, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestCustomerDto } from 'src/application/dtos/customer/request-customer.dto';
import { UpdateCustomerDto } from 'src/application/dtos/customer/update-customer.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllCustomersQuery } from 'src/application/use-cases/custumer/queries/get-all-customers.use-case';
import { CreateCustomerCommand } from 'src/application/use-cases/custumer/commands/create-customer.use-case';
import { UpdateCustomerCommand } from 'src/application/use-cases/custumer/commands/update-customer.use-case';
import { DeleteCustomerCommand } from 'src/application/use-cases/custumer/commands/delete-customer.use-case';
import { GetOneCustomerQuery } from 'src/application/use-cases/custumer/queries/get-one-customers.query';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus

  ) {}

  @Post()
  async create(@Body() requestCustomerDto: RequestCustomerDto) {
    return await this.commandBus.execute(new CreateCustomerCommand(requestCustomerDto));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAllCustomersQuery());
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const numberId = Number(id);
    return this.queryBus.execute(new GetOneCustomerQuery(numberId));
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    const numberId = Number(id);
    return await this.commandBus.execute(new UpdateCustomerCommand(numberId, updateCustomerDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const numberId = Number(id);
    return await this.commandBus.execute(new DeleteCustomerCommand(numberId))
  }
}
