import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { RequestInspectionOnServiceDto } from 'src/core/application/dtos/inspectionOnService/request-InspectionOnService.dto';
import { CreateInspectionOnServiceCommand } from 'src/core/application/use-cases/inspectionOnService/commands/create-inspectionOnService.command';
import { DeleteInspectionOnServiceCommand } from 'src/core/application/use-cases/inspectionOnService/commands/delete-inspectionOnService.command';
import { GetAllInspectionOnServicesQuery } from 'src/core/application/use-cases/inspectionOnService/queries/get-all-inspectionOnServices.query';
import { GetOneInspectionOnServiceQuery } from 'src/core/application/use-cases/inspectionOnService/queries/get-one-inspectionOnService.query';
import { GetPagedInspectionOnServicesQuery } from 'src/core/application/use-cases/inspectionOnService/queries/get-paged-inspectionOnServices.query';
import { ApiPaginatedQuery } from 'src/core/infrastructure/Shared/decorators/api.paginated.decorator';


@Controller('inspectionOnService')
@ApiTags('inspectionOnService')
export class InspectionOnServicesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}
  
  @Get('paginated')
  @ApiPaginatedQuery()
  async findPaginated(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    return await this.queryBus.execute(new GetPagedInspectionOnServicesQuery(Number(page), Number(pageSize)));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const numberId = Number(id);
    return this.queryBus.execute(new GetOneInspectionOnServiceQuery(numberId));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAllInspectionOnServicesQuery());
  }

  @Post()
  async create(@Body() request: RequestInspectionOnServiceDto) {
    return await this.commandBus.execute(new CreateInspectionOnServiceCommand(request));
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const numberId = Number(id);
    return await this.commandBus.execute(new DeleteInspectionOnServiceCommand(numberId))
  }
}
