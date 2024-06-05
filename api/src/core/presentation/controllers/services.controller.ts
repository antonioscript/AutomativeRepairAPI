import { Controller, Get, Post, Put, Body, Param, Delete, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { RequestServiceDto } from 'src/core/application/dtos/service/request-service.dto';
import { UpdateServiceDto } from 'src/core/application/dtos/service/update-service.dto';
import { CreateServiceCommand } from 'src/core/application/use-cases/service/commands/create-service.command';
import { DeleteServiceCommand } from 'src/core/application/use-cases/service/commands/delete-service.command';
import { UpdateServiceCommand } from 'src/core/application/use-cases/service/commands/update-service.command';
import { GetAllServicesQuery } from 'src/core/application/use-cases/service/queries/get-all-services.query';
import { GetOneServiceQuery } from 'src/core/application/use-cases/service/queries/get-one-service.query';
import { GetPagedServicesQuery } from 'src/core/application/use-cases/service/queries/get-paged-services.query';
import { ApiPaginatedQuery } from 'src/core/infrastructure/Shared/decorators/api.paginated.decorator';


@Controller('services')
@ApiTags('services')
export class ServicesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}
  
  @Get('paginated')
  @ApiPaginatedQuery()
  async findPaginated(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    return await this.queryBus.execute(new GetPagedServicesQuery(Number(page), Number(pageSize)));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const numberId = Number(id);
    return this.queryBus.execute(new GetOneServiceQuery(numberId));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAllServicesQuery());
  }

  @Post()
  async create(@Body() request: RequestServiceDto) {
    return await this.commandBus.execute(new CreateServiceCommand(request));
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() request: UpdateServiceDto) {
    const numberId = Number(id);
    return await this.commandBus.execute(new UpdateServiceCommand(numberId, request));
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const numberId = Number(id);
    return await this.commandBus.execute(new DeleteServiceCommand(numberId))
  }
}
