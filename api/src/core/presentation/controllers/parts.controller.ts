import { Controller, Get, Post, Put, Body, Param, Delete, Query } from '@nestjs/common';
import { RequestPartDto } from 'src/core/application/dtos/part/request-part.dto';
import { UpdatePartDto } from 'src/core/application/dtos/part/update-part.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginatedQuery } from 'src/core/infrastructure/Shared/decorators/api.paginated.decorator';
import { GetPagedPartsQuery } from 'src/core/application/use-cases/part/queries/get-paged-parts.query';
import { GetOnePartQuery } from 'src/core/application/use-cases/part/queries/get-one-part.query';
import { GetAllPartsQuery } from 'src/core/application/use-cases/part/queries/get-all-parts.query';
import { CreatePartCommand } from 'src/core/application/use-cases/part/commands/create-part.command';
import { UpdatePartCommand } from 'src/core/application/use-cases/part/commands/update-part.command';
import { DeletePartCommand } from 'src/core/application/use-cases/part/commands/delete-part.command';


@Controller('parts')
@ApiTags('parts')
export class PartsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}
  
  @Get('paginated')
  @ApiPaginatedQuery()
  async findPaginated(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    return await this.queryBus.execute(new GetPagedPartsQuery(Number(page), Number(pageSize)));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const numberId = Number(id);
    return this.queryBus.execute(new GetOnePartQuery(numberId));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAllPartsQuery());
  }

  @Post()
  async create(@Body() request: RequestPartDto) {
    return await this.commandBus.execute(new CreatePartCommand(request));
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() request: UpdatePartDto) {
    const numberId = Number(id);
    return await this.commandBus.execute(new UpdatePartCommand(numberId, request));
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const numberId = Number(id);
    return await this.commandBus.execute(new DeletePartCommand(numberId))
  }
}
