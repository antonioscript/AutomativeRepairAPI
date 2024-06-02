import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseVehicleDto } from "src/core/application/dtos/vehicle/response-vehicle.dto";
import { ResponseVehicleMapper } from "src/core/domain/mapping/vehicle/response-vehicle.mapper";
import { VehicleRepository } from "src/core/infrastructure/Repositories/vehicle/vehicle.repository";
import { constants } from "src/core/infrastructure/Shared/constants";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetPagedVehiclesQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number
  ) {}
}


@QueryHandler(GetPagedVehiclesQuery)
export class GetPagedVehiclesHandler implements IQueryHandler<GetPagedVehiclesQuery, Result<ResponseVehicleDto[]>> {
  private responseMapper: ResponseVehicleMapper;
  constructor(private readonly repository: VehicleRepository) {
    this.responseMapper = new ResponseVehicleMapper();
  }

  async execute(query: GetPagedVehiclesQuery): Promise<Result<ResponseVehicleDto[]>> {
    
    let { page, pageSize } = query;
    
    if (isNaN(page)) {
      page = constants.PAGE_DEFAULT;
    }
    if (isNaN(pageSize)) {
      pageSize = constants.PAGE_SIZE_DEFAULT;
    }

    const { data, total, lastPage, currentPage, perPage, prev, next } = await this.repository.getPaginated(page, pageSize);
  
    const responseData = data.map(vehicle => this.responseMapper.mapTo(vehicle));
  
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
