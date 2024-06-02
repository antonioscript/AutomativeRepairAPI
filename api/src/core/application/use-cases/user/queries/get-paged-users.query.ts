import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseUserDto } from "src/core/application/dtos/user/response-user.dto";
import { ResponseUserMapper } from "src/core/domain/mapping/user/response-user.mapper";
import { UserRepository } from "src/core/infrastructure/Repositories/user/user.repository";
import { constants } from "src/core/infrastructure/Shared/constants";
import { Result, result } from "src/core/infrastructure/Shared/result.util";


export class GetPagedUsersQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number
  ) {}
}


@QueryHandler(GetPagedUsersQuery)
export class GetPagedUsersHandler implements IQueryHandler<GetPagedUsersQuery, Result<ResponseUserDto[]>> {
  private responseMapper: ResponseUserMapper;
  constructor(private readonly repository: UserRepository) {
    this.responseMapper = new ResponseUserMapper();
  }

  async execute(query: GetPagedUsersQuery): Promise<Result<ResponseUserDto[]>> {
    
    let { page, pageSize } = query;
    
    if (isNaN(page)) {
      page = constants.PAGE_DEFAULT;
    }
    if (isNaN(pageSize)) {
      pageSize = constants.PAGE_SIZE_DEFAULT;
    }

    const { data, total, lastPage, currentPage, perPage, prev, next } = await this.repository.getPaginated(page, pageSize);
  
    const responseData = data.map(user => this.responseMapper.mapTo(user));
  
    const pagination = {
      total,
      lastPage,
      currentPage,
      perPage,
      prev,
      next,
    };
  
    return result(responseData).PaginationSuccess(pagination); 
  }
  
}
