import { Controller, Get, Post, Put, Body, Param, Delete, Headers, UseGuards, Req } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { AuthForgetDto } from 'src/core/application/dtos/authentication/auth.forget.dto';
import { AuthLoginDto } from 'src/core/application/dtos/authentication/auth.login.dto';
import { AuthTokenDto } from 'src/core/application/dtos/authentication/auth.token.dto';
import { RequestUserDto } from 'src/core/application/dtos/user/request-user.dto';
import { UpdateUserDto } from 'src/core/application/dtos/user/update-user.dto';
import { AuthorizationCommand } from 'src/core/application/use-cases/user/commands/authorization.user.command';
import { DeleteUserCommand } from 'src/core/application/use-cases/user/commands/delete-user.command';
import { ForgetPasswordCommand } from 'src/core/application/use-cases/user/commands/forget.user.command';
import { LoginCommand } from 'src/core/application/use-cases/user/commands/login.user.command';
import { RegisterUserCommand } from 'src/core/application/use-cases/user/commands/register-user.command';
import { UpdateUserCommand } from 'src/core/application/use-cases/user/commands/update-user.command';
import { GetAllUsersQuery } from 'src/core/application/use-cases/user/queries/get-all-users.query';
import { GetOneUserQuery } from 'src/core/application/use-cases/user/queries/get-one-user.query';
import { AuthGuard } from 'src/core/infrastructure/Shared/auth.guards';
import { AuthService } from 'src/core/infrastructure/Shared/auth.service';
import { User } from 'src/core/infrastructure/Shared/user.decorator';

@Controller('authentication')
@ApiTags('authentication')
export class AuthController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly authService: AuthService

  ) {}
  
  @Get('users')
  async findAll() {
    return this.queryBus.execute(new GetAllUsersQuery());
  }

  @Get('user/:id')
  async findOne(@Param('id') id: number) {
    const numberId = Number(id);
    return this.queryBus.execute(new GetOneUserQuery(numberId));
  }


  @Put('user/:id')
  async update(@Param('id') id: number, @Body() request: UpdateUserDto) {
    const numberId = Number(id);
    return await this.commandBus.execute(new UpdateUserCommand(numberId, request));
  }

  @Delete('user/:id')
  async remove(@Param('id') id: number) {
    const numberId = Number(id);
    return await this.commandBus.execute(new DeleteUserCommand(numberId))
  }

  @Post('register')
  async create(@Body() request: RequestUserDto) {
    return await this.commandBus.execute(new RegisterUserCommand(request));
  }

  @Post('login')
  async login(@Body() request: AuthLoginDto) {
    return await this.commandBus.execute(new LoginCommand(request));
  }

  @Post('forget')
  async forgetPassword(@Body() request: AuthForgetDto) {
    return await this.commandBus.execute(new ForgetPasswordCommand(request));
  }

  // @Post('me')
  // async me(@Headers() request: AuthTokenDto ) {
  //   return await this.commandBus.execute(new AuthorizationCommand(request));
  // }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user) {
    return {user};
  }
}
