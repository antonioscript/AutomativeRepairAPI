import { Controller, Get, Post, Put, Body, Param, Delete, Headers, UseGuards, Req, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { AuthForgetDto } from 'src/core/application/dtos/authentication/auth.forget.dto';
import { AuthLoginDto } from 'src/core/application/dtos/authentication/auth.login.dto';
import { RequestUserDto } from 'src/core/application/dtos/user/request-user.dto';
import { UpdateUserDto } from 'src/core/application/dtos/user/update-user.dto';
import { DeleteUserCommand } from 'src/core/application/use-cases/user/commands/delete-user.command';
import { ForgetPasswordCommand } from 'src/core/application/use-cases/user/commands/forget.user.command';
import { LoginCommand } from 'src/core/application/use-cases/user/commands/login.user.command';
import { RegisterUserCommand } from 'src/core/application/use-cases/user/commands/register-user.command';
import { UpdateUserCommand } from 'src/core/application/use-cases/user/commands/update-user.command';
import { GetAllUsersQuery } from 'src/core/application/use-cases/user/queries/get-all-users.query';
import { GetOneUserQuery } from 'src/core/application/use-cases/user/queries/get-one-user.query';
import { GetPagedUsersQuery } from 'src/core/application/use-cases/user/queries/get-paged-users.query';
import { ApiPaginatedQuery } from 'src/core/infrastructure/Shared/decorators/api.paginated.decorator';
import { Roles } from 'src/core/infrastructure/Shared/decorators/roles.decorator';
import { AuthGuard } from 'src/core/infrastructure/Shared/guards/auth.guards';
import { RoleGuard } from 'src/core/infrastructure/Shared/guards/role.guard';
import { Role } from 'src/core/infrastructure/enums/role.enum';



@Controller('authentication')
@ApiTags('authentication')
export class AuthController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,

  ) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Get('users')
  async findAll() {
    return this.queryBus.execute(new GetAllUsersQuery());
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Get('paginated')
  @Roles(Role.Admin)
  @ApiPaginatedQuery()
  async findPaginated(@Query('page') page?: number, @Query('pageSize') pageSize?: number) {
    return await this.queryBus.execute(new GetPagedUsersQuery(Number(page), Number(pageSize)));
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Get('user/:id')
  async findOne(@Param('id') id: number) {
    const numberId = Number(id);
    return this.queryBus.execute(new GetOneUserQuery(numberId));
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Put('user/:id')
  async update(@Param('id') id: number, @Body() request: UpdateUserDto) {
    const numberId = Number(id);
    return await this.commandBus.execute(new UpdateUserCommand(numberId, request));
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Delete('user/:id')
  async remove(@Param('id') id: number) {
    const numberId = Number(id);
    return await this.commandBus.execute(new DeleteUserCommand(numberId))
  }

  
  @Post('register')
  async create(@Body() request: RequestUserDto) {
    return await this.commandBus.execute(new RegisterUserCommand(request));
  }

  //@Roles(Role.Admin)
  @Post('login')
  async login(@Body() request: AuthLoginDto) {
    return await this.commandBus.execute(new LoginCommand(request));
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Post('forget')
  async forgetPassword(@Body() request: AuthForgetDto) {
    return await this.commandBus.execute(new ForgetPasswordCommand(request));
  }
}
