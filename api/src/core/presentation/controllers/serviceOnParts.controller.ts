import { Controller, Get, Post, Put, Body, Param, Delete, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { RequestServiceOnPartDto } from 'src/core/application/dtos/serviceOnPart/request-serviceOnPart.dto';
import { CreateServiceOnPartCommand } from 'src/core/application/use-cases/serviceOnPart/commands/create-serviceOnPart.command';
import { DeleteServiceOnPartCommand } from 'src/core/application/use-cases/serviceOnPart/commands/delete-serviceOnPart.command';
import { GetAllServiceOnPartsQuery } from 'src/core/application/use-cases/serviceOnPart/queries/get-all-serviceOnParts.query';
import { GetOneServiceOnPartQuery } from 'src/core/application/use-cases/serviceOnPart/queries/get-one-serviceOnParts.query';
import { GetPagedServiceOnPartsQuery } from 'src/core/application/use-cases/serviceOnPart/queries/get-paged-serviceOnParts.query';
import { ApiPaginatedQuery } from 'src/core/infrastructure/Shared/decorators/api.paginated.decorator';


@Controller('serviceOnParts')
@ApiTags('serviceOnParts')
export class ServiceOnPartsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}
  
  @Get('paginated')
  @ApiPaginatedQuery()
  async findPaginated(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    return await this.queryBus.execute(new GetPagedServiceOnPartsQuery(Number(page), Number(pageSize)));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const numberId = Number(id);
    return this.queryBus.execute(new GetOneServiceOnPartQuery(numberId));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAllServiceOnPartsQuery());
  }

  @Post()
  async create(@Body() request: RequestServiceOnPartDto) {
    return await this.commandBus.execute(new CreateServiceOnPartCommand(request));
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const numberId = Number(id);
    return await this.commandBus.execute(new DeleteServiceOnPartCommand(numberId))
  }
}
