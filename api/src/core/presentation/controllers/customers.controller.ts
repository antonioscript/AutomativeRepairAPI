import { Controller, Get, Post, Put, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RequestCustomerDto } from 'src/core/application/dtos/customer/request-customer.dto';
import { UpdateCustomerDto } from 'src/core/application/dtos/customer/update-customer.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCustomerCommand } from 'src/core/application/use-cases/custumer/commands/create-customer.command';
import { GetOneCustomerQuery } from 'src/core/application/use-cases/custumer/queries/get-one-customer.query';
import { GetAllCustomersQuery } from 'src/core/application/use-cases/custumer/queries/get-all-customers.query';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCustomerCommand } from 'src/core/application/use-cases/custumer/commands/update-customer.command';
import { DeleteCustomerCommand } from 'src/core/application/use-cases/custumer/commands/delete-customer.command';
import { PrismaService } from 'src/core/infrastructure/database/prisma.service';
import { PaginationService } from 'src/pagination/pagination.service';

@Controller('customers')
@ApiTags('customers')
export class CustomersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly paginationService: PaginationService

  ) {}
  
  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAllCustomersQuery());
  }

  @Get('Pagination')
async findAllPage(
  @Query('page') page: number = 1,
  @Query('pageSize') pageSize: number = 10,
) {
  return this.paginationService.findPaginatedData(Number(page), Number(pageSize));
}


  @Get(':id')
  async findOne(@Param('id') id: number) {
    const numberId = Number(id);
    return this.queryBus.execute(new GetOneCustomerQuery(numberId));
  }

  @Post()
  async create(@Body() request: RequestCustomerDto) {
    return await this.commandBus.execute(new CreateCustomerCommand(request));
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() request: UpdateCustomerDto) {
    const numberId = Number(id);
    return await this.commandBus.execute(new UpdateCustomerCommand(numberId, request));
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const numberId = Number(id);
    return await this.commandBus.execute(new DeleteCustomerCommand(numberId))
  }
}
