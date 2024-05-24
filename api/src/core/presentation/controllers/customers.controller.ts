import { Controller, Get, Post, Put, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestCustomerDto } from 'src/core/application/dtos/customer/request-customer.dto';
import { UpdateCustomerDto } from 'src/core/application/dtos/customer/update-customer.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCustomerCommand } from 'src/core/application/use-cases/custumer/commands/create-customer.command';
import { UpdateCustomerCommand } from 'src/core/application/use-cases/custumer/commands/update-customer.use-command';
import { GetOneCustomerQuery } from 'src/core/application/use-cases/custumer/queries/get-one-customers.query';
import { GetAllCustomersQuery } from 'src/core/application/use-cases/custumer/queries/get-all-customers.query';
import { DeleteCustomerCommand } from 'src/core/application/use-cases/custumer/commands/delete-customer.use-command';

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
