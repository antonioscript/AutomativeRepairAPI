import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RequestUserDto } from "src/core/application/dtos/user/request-user.dto";
import { ResponseUserDto } from "src/core/application/dtos/user/response-user.dto";
import { RequestUserMapper } from "src/core/domain/mapping/user/request-user.mapper";
import { ResponseUserMapper } from "src/core/domain/mapping/user/response-user.mapper";
import { UserRepository } from "src/core/infrastructure/Repositories/user/user.repository";
import { messages } from "src/core/infrastructure/Shared/messages";
import { Result, result } from "src/core/infrastructure/Shared/result.util";


export class CreateUserCommand {
  constructor(public readonly request: RequestUserDto) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, Result<ResponseUserDto>> {
  private requestMapper: RequestUserMapper
  private responseMapper: ResponseUserMapper

  constructor(private readonly repository: UserRepository) {
    this.requestMapper = new RequestUserMapper()
    this.responseMapper = new ResponseUserMapper()
  }

  async execute(command: CreateUserCommand): Promise<Result<ResponseUserDto>> {

    const registerExists = await this.repository.getFirstByParameters({
      email: command.request.email
    });

    if (registerExists)
      throw new BadRequestException(messages.USER_ALREADY_EXISTS(command.request.email));

    const entity = this.requestMapper.mapFrom(command.request);
    const responseEntity = await this.repository.create(entity);
    const responseData = this.responseMapper.mapTo(responseEntity);
    
    return result(responseData).Success();
  }
}