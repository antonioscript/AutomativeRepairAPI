import { UnauthorizedException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AuthLoginDto } from "src/core/application/dtos/authentication/auth.login.dto";
import { UserRepository } from "src/core/infrastructure/Repositories/user/user.repository";
import { AuthService } from "src/core/infrastructure/Shared/auth.service";
import { Result, result } from "src/core/infrastructure/Shared/result.util";


export class LoginCommand {
  constructor(public readonly request: AuthLoginDto) {}
}

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand, Result<{ token: string }>> {

  constructor(
    private readonly repository: UserRepository,
    private readonly authService: AuthService
  ) {}

  async execute(command: LoginCommand):  Promise<Result<{ token: string }>> {

    const user = await this.repository.login(command.request.email, command.request.password);
    
    if (!user) {
      throw new UnauthorizedException("O Email está incorreto");
    }

    const token =  await this.authService.createToken(user);
    return result({ token: token }).Success();
    
  }
}