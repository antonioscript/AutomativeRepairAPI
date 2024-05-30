import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseUserDto } from "src/core/application/dtos/user/response-user.dto";
import { ResponseUserMapper } from "src/core/domain/mapping/user/response-user.mapper";
import { UserRepository } from "src/core/infrastructure/Repositories/user/user.repository";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetAllUsersQuery {

}

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery, Result<ResponseUserDto[]>> {
  private responseMapper: ResponseUserMapper
  constructor ( private readonly repository: UserRepository) {
    this.responseMapper = new ResponseUserMapper()
  }
  
  
  async execute(query: GetAllUsersQuery): Promise<Result<ResponseUserDto[]>> {
    const registers = await this.repository.getAll();
    const responseData =  registers.map(user => this.responseMapper.mapTo(user))

    return result(responseData).Success();
  }
  
}
