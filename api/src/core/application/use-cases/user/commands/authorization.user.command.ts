import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AuthTokenDto } from "src/core/application/dtos/authentication/auth.token.dto";
import { AuthService } from "src/core/infrastructure/Shared/auth.service";
import { Result, result } from "src/core/infrastructure/Shared/result.util";


export class AuthorizationCommand {
  constructor(public readonly request: AuthTokenDto) {}
}

@CommandHandler(AuthorizationCommand)
export class AuthorizationHandler implements ICommandHandler<AuthorizationCommand> {

  constructor(private readonly authService: AuthService) {}

  async execute(command: AuthorizationCommand):  Promise<Result<{ userInfo: string }>> {
    const token =  await this.authService.checkToken(command.request.token.split(' ')[1]);
    return result({ userInfo: token }).Success();
  }
}