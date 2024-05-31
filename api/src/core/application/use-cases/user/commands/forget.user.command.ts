import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AuthForgetDto } from "src/core/application/dtos/authentication/auth.forget.dto";
import { UserRepository } from "src/core/infrastructure/Repositories/user/user.repository";


export class ForgetPasswordCommand {
  constructor(public readonly request: AuthForgetDto) {}
}

@CommandHandler(ForgetPasswordCommand)
export class ForgetPasswordHandler implements ICommandHandler<ForgetPasswordCommand, true> {

  constructor(private readonly repository: UserRepository) {

  }

  async execute(command: ForgetPasswordCommand): Promise<true> {

    await this.repository.forget(command.request.email)

    return true;
  }
}