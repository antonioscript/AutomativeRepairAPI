import { Controller, Get, Post, Put, Body, Param, Delete, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { RequestVehicleDto } from 'src/core/application/dtos/vehicle/request-vehicle.dto';
import { UpdateVehicleDto } from 'src/core/application/dtos/vehicle/update-vehicle.dto';
import { CreateVehicleCommand } from 'src/core/application/use-cases/vehicle/commands/create-vehicle.command';
import { DeleteVehicleCommand } from 'src/core/application/use-cases/vehicle/commands/delete-vehicle.command';
import { UpdateVehicleCommand } from 'src/core/application/use-cases/vehicle/commands/update-vehicle.command';
import { GetAllVehiclesQuery } from 'src/core/application/use-cases/vehicle/queries/get-all-vehicles.query';
import { GetOneVehicleQuery } from 'src/core/application/use-cases/vehicle/queries/get-one-vehicle.query';
import { GetPagedVehiclesQuery } from 'src/core/application/use-cases/vehicle/queries/get-paged-vehicles.query';
import { ApiPaginatedQuery } from 'src/core/infrastructure/Shared/decorators/api.paginated.decorator';


@Controller('vehicles')
@ApiTags('vehicles')
export class VehiclesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus

  ) {}


  @Get('paginated')
  @ApiPaginatedQuery()
  async findPaginated(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    return await this.queryBus.execute(new GetPagedVehiclesQuery(Number(page), Number(pageSize)));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const numberId = Number(id);
    return this.queryBus.execute(new GetOneVehicleQuery(numberId));
  }

  
  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAllVehiclesQuery());
  }
  
  @Post()
  async create(@Body() request: RequestVehicleDto) {
    return await this.commandBus.execute(new CreateVehicleCommand(request));
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() request: UpdateVehicleDto) {
    const numberId = Number(id);
    return await this.commandBus.execute(new UpdateVehicleCommand(numberId, request));
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const numberId = Number(id);
    return await this.commandBus.execute(new DeleteVehicleCommand(numberId))
  }

  
  
}
