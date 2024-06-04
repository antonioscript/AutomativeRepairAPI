import { Controller, Get, Post, Put, Body, Delete, Param, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { RequestAppointmentStatusDto } from 'src/core/application/dtos/appointmentStatus/request-appointmentStatus.dto';
import { UpdateAppointmentStatusDto } from 'src/core/application/dtos/appointmentStatus/update-appointmentStatus.dto';
import { CreateAppointmentStatusCommand } from 'src/core/application/use-cases/appointmentStatus/commands/create-appointmentStatus.command';
import { DeleteAppointmentStatusCommand } from 'src/core/application/use-cases/appointmentStatus/commands/delete-appointmentStatus.command';
import { UpdateAppointmentStatusCommand } from 'src/core/application/use-cases/appointmentStatus/commands/update-appointmentStatus.command';
import { GetAllAppointmentStatusQuery } from 'src/core/application/use-cases/appointmentStatus/queries/get-all-appointmentSatus.query';
import { GetOneAppointmentStatusQuery } from 'src/core/application/use-cases/appointmentStatus/queries/get-one-appointmentStatus.query';
import { GetPagedAppointmentStatusQuery } from 'src/core/application/use-cases/appointmentStatus/queries/get-paged-appointmentStatus.query';
import { ApiPaginatedQuery } from 'src/core/infrastructure/Shared/decorators/api.paginated.decorator';

@Controller('appointmentsStatus')
@ApiTags('appointmentsStatus')
export class AppointmentStatusController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}
  
  @Get('paginated')
  @ApiPaginatedQuery()
  async findPaginated(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    return await this.queryBus.execute(new GetPagedAppointmentStatusQuery(Number(page), Number(pageSize)));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const numberId = Number(id);
    return this.queryBus.execute(new GetOneAppointmentStatusQuery(numberId));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAllAppointmentStatusQuery());
  }

  @Post()
  async create(@Body() request: RequestAppointmentStatusDto) {
    return await this.commandBus.execute(new CreateAppointmentStatusCommand(request));
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() request: UpdateAppointmentStatusDto) {
    const numberId = Number(id);
    return await this.commandBus.execute(new UpdateAppointmentStatusCommand(numberId, request));
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const numberId = Number(id);
    return await this.commandBus.execute(new DeleteAppointmentStatusCommand(numberId))
  }
}
