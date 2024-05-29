import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { RequestVehicleTypeDto } from 'src/core/application/dtos/vehicleType/request-vehicleType.dto';
import { UpdateVehicleTypeDto } from 'src/core/application/dtos/vehicleType/update-vehicleType.dto';
import { CreateVehicleTypeCommand } from 'src/core/application/use-cases/vehicleType/commands/create-vehicleType.command';
import { DeleteVehicleTypeCommand } from 'src/core/application/use-cases/vehicleType/commands/delete-vehicleType.use-command';
import { UpdateVehicleTypeCommand } from 'src/core/application/use-cases/vehicleType/commands/update-vehicleType.use-command';
import { GetAllVehicleTypesQuery } from 'src/core/application/use-cases/vehicleType/queries/get-all-vehicleTypes.query';
import { GetOneVehicleTypeQuery } from 'src/core/application/use-cases/vehicleType/queries/get-one-vehicleType.query';

@Controller('vehicleTypes')
@ApiTags('vehicleTypes')
export class VehicleTypesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus

  ) {}


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
  async create(@Body() requestVehicleTypeDto: RequestVehicleTypeDto) {
    return await this.commandBus.execute(new CreateVehicleTypeCommand(requestVehicleTypeDto));
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateVehicleTypeDto: UpdateVehicleTypeDto) {
    const numberId = Number(id);
    return await this.commandBus.execute(new UpdateVehicleTypeCommand(numberId, updateVehicleTypeDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const numberId = Number(id);
    return await this.commandBus.execute(new DeleteVehicleTypeCommand(numberId))
  }
  
}
