import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseUserDto } from "src/core/application/dtos/user/response-user.dto";
import { ResponseUserMapper } from "src/core/domain/mapping/user/response-user.mapper";
import { UserRepository } from "src/core/infrastructure/Repositories/user/user.repository";
import { messages } from "src/core/infrastructure/Shared/messages";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetOneUserQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetOneUserQuery)
export class GetOneUserHandler implements IQueryHandler<GetOneUserQuery, Result<ResponseUserDto>> {
  private responseMapper: ResponseUserMapper
  constructor ( private readonly repository: UserRepository) {
    this.responseMapper = new ResponseUserMapper()
  }
  
  
  async execute(query: GetOneUserQuery): Promise<Result<ResponseUserDto>> {
    const register = await this.repository.getById(query.id);

    if (!register)
      throw new NotFoundException(messages.USER_NOT_FOUND(query.id))

    const responseData = this.responseMapper.mapTo(register);

    return result(responseData).Success();
  }
  
}
