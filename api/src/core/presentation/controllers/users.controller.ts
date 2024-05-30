import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { RequestUserDto } from 'src/core/application/dtos/user/request-user.dto';
import { UpdateUserDto } from 'src/core/application/dtos/user/update-user.dto';
import { CreateUserCommand } from 'src/core/application/use-cases/user/commands/create-user.command';
import { DeleteUserCommand } from 'src/core/application/use-cases/user/commands/delete-user.command';
import { UpdateUserCommand } from 'src/core/application/use-cases/user/commands/update-user.command';
import { GetAllUsersQuery } from 'src/core/application/use-cases/user/queries/get-all-users.query';
import { GetOneUserQuery } from 'src/core/application/use-cases/user/queries/get-one-user.query';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus

  ) {}
  
  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAllUsersQuery());
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const numberId = Number(id);
    return this.queryBus.execute(new GetOneUserQuery(numberId));
  }

  @Post()
  async create(@Body() request: RequestUserDto) {
    return await this.commandBus.execute(new CreateUserCommand(request));
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() request: UpdateUserDto) {
    const numberId = Number(id);
    return await this.commandBus.execute(new UpdateUserCommand(numberId, request));
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const numberId = Number(id);
    return await this.commandBus.execute(new DeleteUserCommand(numberId))
  }
}
