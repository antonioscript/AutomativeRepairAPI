import { Controller, Get, Post, Put, Body, Param, Delete, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { RequestServiceOrderDto } from 'src/core/application/dtos/serviceOrder/request-serviceOrder.dto';
import { CloseServiceOrderCommand } from 'src/core/application/use-cases/serviceOrder/commands/close-serviceOrder.command';
import { CreateServiceOrderCommand } from 'src/core/application/use-cases/serviceOrder/commands/create-serviceOrder.command';
import { GetAllServiceOrdersQuery } from 'src/core/application/use-cases/serviceOrder/queries/get-all-serviceOrders.query';
import { GetOneServiceOrderQuery } from 'src/core/application/use-cases/serviceOrder/queries/get-one-serviceOrders.query';
import { GetPagedServiceOrdersQuery } from 'src/core/application/use-cases/serviceOrder/queries/get-paged-serviceOrders.query';
import { ApiPaginatedQuery } from 'src/core/infrastructure/Shared/decorators/api.paginated.decorator';



@Controller('serviceOrders')
@ApiTags('serviceOrders')
export class ServiceOrdersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}
  
  @Get('paginated')
  @ApiPaginatedQuery()
  async findPaginated(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    return await this.queryBus.execute(new GetPagedServiceOrdersQuery(Number(page), Number(pageSize)));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const numberId = Number(id);
    return this.queryBus.execute(new GetOneServiceOrderQuery(numberId));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAllServiceOrdersQuery());
  }

 
  @Post('GenerateOrderService')
  async create(@Body() request: RequestServiceOrderDto) {
    return await this.commandBus.execute(new CreateServiceOrderCommand(request));
  }

  
  @Post('CloseOrderService')
  async close(@Body() request: RequestServiceOrderDto) {
    return await this.commandBus.execute(new CloseServiceOrderCommand(request));
  }
}
