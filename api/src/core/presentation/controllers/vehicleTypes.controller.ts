import { Controller, Get, Post, Put, Body, Param, Delete, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { RequestVehicleTypeDto } from 'src/core/application/dtos/vehicleType/request-vehicleType.dto';
import { UpdateVehicleTypeDto } from 'src/core/application/dtos/vehicleType/update-vehicleType.dto';
import { CreateVehicleTypeCommand } from 'src/core/application/use-cases/vehicleType/commands/create-vehicleType.command';
import { DeleteVehicleTypeCommand } from 'src/core/application/use-cases/vehicleType/commands/delete-vehicleType.use-command';
import { UpdateVehicleTypeCommand } from 'src/core/application/use-cases/vehicleType/commands/update-vehicleType.use-command';
import { GetAllVehicleTypesQuery } from 'src/core/application/use-cases/vehicleType/queries/get-all-vehicleTypes.query';
import { GetOneVehicleTypeQuery } from 'src/core/application/use-cases/vehicleType/queries/get-one-vehicleType.query';
import { GetPagedVehicleTypesQuery } from 'src/core/application/use-cases/vehicleType/queries/get-paged-vehicleTypes.query';
import { ApiPaginatedQuery } from 'src/core/infrastructure/Shared/decorators/api.paginated.decorator';

@Controller('vehicleTypes')
@ApiTags('vehicleTypes')
export class VehicleTypesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus

  ) {}

  @Get('paginated')
  @ApiPaginatedQuery()
  async findPaginated(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    return await this.queryBus.execute(new GetPagedVehicleTypesQuery(Number(page), Number(pageSize)));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAllVehicleTypesQuery());
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const numberId = Number(id);
    return this.queryBus.execute(new GetOneVehicleTypeQuery(numberId));
  }
  
  @Post()
  async create(@Body() request: RequestVehicleTypeDto) {
    return await this.commandBus.execute(new CreateVehicleTypeCommand(request));
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() request: UpdateVehicleTypeDto) {
    const numberId = Number(id);
    return await this.commandBus.execute(new UpdateVehicleTypeCommand(numberId, request));
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const numberId = Number(id);
    return await this.commandBus.execute(new DeleteVehicleTypeCommand(numberId))
  }
  
}
