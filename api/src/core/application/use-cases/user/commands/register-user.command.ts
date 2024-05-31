import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RequestUserDto } from "src/core/application/dtos/user/request-user.dto";
import { UserLoginResponseDto } from "src/core/application/dtos/user/response.login.user.dto";
import { RequestUserMapper } from "src/core/domain/mapping/user/request-user.mapper";
import { ResponseUserMapper } from "src/core/domain/mapping/user/response-user.mapper";
import { UserRepository } from "src/core/infrastructure/Repositories/user/user.repository";
import { AuthService } from "src/core/infrastructure/Shared/auth.service";
import { messages } from "src/core/infrastructure/Shared/messages";
import { Result, result } from "src/core/infrastructure/Shared/result.util";


export class RegisterUserCommand {
  constructor(public readonly request: RequestUserDto) {}
}

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand, Result<UserLoginResponseDto>> {
  private requestMapper: RequestUserMapper
  private responseMapper: ResponseUserMapper

  constructor(
    private readonly repository: UserRepository,
    private readonly authService: AuthService
  ) {
    this.requestMapper = new RequestUserMapper()
    this.responseMapper = new ResponseUserMapper()
  }

  async execute(command: RegisterUserCommand): Promise<Result<UserLoginResponseDto>> {

    const registerExists = await this.repository.getFirstByParameters({
      email: command.request.email
    });

    if (registerExists)
      throw new BadRequestException(messages.USER_ALREADY_EXISTS(command.request.email));

    const entity = this.requestMapper.mapFrom(command.request);
    const responseEntity = await this.repository.create(entity);
    const responseData = this.responseMapper.mapTo(responseEntity);

    const user = await this.repository.login(entity.email, entity.password);
    const token =  await this.authService.createToken(user);
    const userLoginResponse = new UserLoginResponseDto(responseData, token);
    
    return result(userLoginResponse).Success();
  }
}