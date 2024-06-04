import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { RequestAppointmentDto } from 'src/core/application/dtos/appointment/request-appointment.dto';
import { UpdateAppointmentDto } from 'src/core/application/dtos/appointment/update-appointment.dto';
import { CreateAppointmentCommand } from 'src/core/application/use-cases/appointment/commands/create-appointment.command';
import { UpdateAppointmentCommand } from 'src/core/application/use-cases/appointment/commands/update-appointment.command';
import { GetAllAppointmentsQuery } from 'src/core/application/use-cases/appointment/queries/get-all-appointments.query';
import { GetOneAppointmentQuery } from 'src/core/application/use-cases/appointment/queries/get-one-appointment.query';
import { GetPagedAppointmentsQuery } from 'src/core/application/use-cases/appointment/queries/get-paged-appointments.query';
import { ApiPaginatedQuery } from 'src/core/infrastructure/Shared/decorators/api.paginated.decorator';

@Controller('appointments')
@ApiTags('appointments')
export class AppointmentsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}
  
  @Get('paginated')
  @ApiPaginatedQuery()
  async findPaginated(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    return await this.queryBus.execute(new GetPagedAppointmentsQuery(Number(page), Number(pageSize)));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const numberId = Number(id);
    return this.queryBus.execute(new GetOneAppointmentQuery(numberId));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAllAppointmentsQuery());
  }

  @Post()
  async create(@Body() request: RequestAppointmentDto) {
    return await this.commandBus.execute(new CreateAppointmentCommand(request));
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() request: UpdateAppointmentDto) {
    const numberId = Number(id);
    return await this.commandBus.execute(new UpdateAppointmentCommand(numberId, request));
  }

}
