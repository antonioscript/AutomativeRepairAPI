import { Controller, Get, Post, Put, Body, Param, Delete, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { UpdateInspectionDto } from 'src/core/application/dtos/inspection/update-inspection.dto';
import { RequestServiceOrderDto } from 'src/core/application/dtos/serviceOrder/request-serviceOrder.dto';
import { CloseServiceOrderCommand } from 'src/core/application/use-cases/serviceOrder/commands/close-serviceOrder.command';
import { CreateServiceOrderCommand } from 'src/core/application/use-cases/serviceOrder/commands/create-serviceOrder.command';
import { ApiPaginatedQuery } from 'src/core/infrastructure/Shared/decorators/api.paginated.decorator';



@Controller('serviceOrders')
@ApiTags('serviceOrders')
export class ServiceOrdersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}
  
 
  @Post('GenerateOrderService')
  async create(@Body() request: RequestServiceOrderDto) {
    return await this.commandBus.execute(new CreateServiceOrderCommand(request));
  }

  
  @Post('CloseOrderService')
  async close(@Body() request: RequestServiceOrderDto) {
    return await this.commandBus.execute(new CloseServiceOrderCommand(request));
  }
}
