import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { BadRequestException, NotFoundException } from "@nestjs/common"
import { messages } from "src/core/infrastructure/Shared/messages"
import { CustomerRepository } from "src/core/infrastructure/Repositories/customer/customer.repository"
import { UpdateUserDto } from "src/core/application/dtos/user/update-user.dto"
import { UpdateUserMapper } from "src/core/domain/mapping/user/update-user.mapper"
import { ResponseUserMapper } from "src/core/domain/mapping/user/response-user.mapper"
import { ResponseUserDto } from "src/core/application/dtos/user/response-user.dto"
import { UserRepository } from "src/core/infrastructure/Repositories/user/user.repository"

export class UpdateUserCommand {
  constructor(
    public readonly id: number,
    public readonly request: UpdateUserDto
  ) {}
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand, Result<ResponseUserDto>> {
  private updateMapper: UpdateUserMapper
  private responseMapper: ResponseUserMapper

  constructor(private readonly repository: UserRepository) {
    this.updateMapper = new UpdateUserMapper()
    this.responseMapper = new ResponseUserMapper()
  }

  async execute(command: UpdateUserCommand): Promise<Result<ResponseUserDto>> {

    if (command.id != command.request.id)
      throw new BadRequestException(messages.DEFAULT_UPDATE_BAD_REQUEST);

    const register  = await this.repository.getById(command.id);
    if (!register) {
      throw new NotFoundException(messages.USER_NOT_FOUND(command.id));

    } else {

      const entity = this.updateMapper.mapFrom(command.request);
      const responseEntity = await this.repository.update(command.id, entity)
      const responseData =  this.responseMapper.mapTo(responseEntity)

      return result(responseData).Success();
    }
  }
}
