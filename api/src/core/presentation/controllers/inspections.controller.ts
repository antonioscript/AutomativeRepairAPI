import { Controller, Get, Post, Put, Body, Param, Delete, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { RequestInspectionDto } from 'src/core/application/dtos/inspection/request-inspection.dto';
import { UpdateInspectionDto } from 'src/core/application/dtos/inspection/update-inspection.dto';
import { CreateInspectionCommand } from 'src/core/application/use-cases/inspection/commands/create-inspection.command';
import { DeleteInspectionCommand } from 'src/core/application/use-cases/inspection/commands/delete-inspection.command';
import { UpdateInspectionCommand } from 'src/core/application/use-cases/inspection/commands/update-inspection.command';
import { GetAllInspectionsQuery } from 'src/core/application/use-cases/inspection/queries/get-all-inspections.query';
import { GetOneInspectionQuery } from 'src/core/application/use-cases/inspection/queries/get-one-inspection.query';
import { GetPagedInspectionsQuery } from 'src/core/application/use-cases/inspection/queries/get-paged-inspections.query';
import { ApiPaginatedQuery } from 'src/core/infrastructure/Shared/decorators/api.paginated.decorator';



@Controller('inspections')
@ApiTags('inspections')
export class InspectionsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}
  
  @Get('paginated')
  @ApiPaginatedQuery()
  async findPaginated(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    return await this.queryBus.execute(new GetPagedInspectionsQuery(Number(page), Number(pageSize)));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const numberId = Number(id);
    return this.queryBus.execute(new GetOneInspectionQuery(numberId));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAllInspectionsQuery());
  }

  @Post()
  async create(@Body() request: RequestInspectionDto) {
    return await this.commandBus.execute(new CreateInspectionCommand(request));
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() request: UpdateInspectionDto) {
    const numberId = Number(id);
    return await this.commandBus.execute(new UpdateInspectionCommand(numberId, request));
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const numberId = Number(id);
    return await this.commandBus.execute(new DeleteInspectionCommand(numberId))
  }
}
