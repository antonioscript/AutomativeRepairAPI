import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseVehicleTypeDto } from "src/core/application/dtos/vehicleType/response-vehicleType.dto";
import { ResponseVehicleTypeMapper } from "src/core/domain/mapping/vehicleType/response-vehicleType.mapper";
import { VehicleTypeRepository } from "src/core/infrastructure/Repositories/vehicleType/vehicleType.repository";
import { constants } from "src/core/infrastructure/Shared/constants";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetPagedVehicleTypesQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number
  ) {}
}


@QueryHandler(GetPagedVehicleTypesQuery)
export class GetPagedVehicleTypesHandler implements IQueryHandler<GetPagedVehicleTypesQuery, Result<ResponseVehicleTypeDto[]>> {
  private responseMapper: ResponseVehicleTypeMapper;
  constructor(private readonly repository: VehicleTypeRepository) {
    this.responseMapper = new ResponseVehicleTypeMapper();
  }

  async execute(query: GetPagedVehicleTypesQuery): Promise<Result<ResponseVehicleTypeDto[]>> {
    
    let { page, pageSize } = query;
    
    if (isNaN(page)) {
      page = constants.PAGE_DEFAULT;
    }
    if (isNaN(pageSize)) {
      pageSize = constants.PAGE_SIZE_DEFAULT;
    }

    const { data, total, lastPage, currentPage, perPage, prev, next } = await this.repository.getPaginated(page, pageSize);
  
    const responseData = data.map(vehicleType => this.responseMapper.mapTo(vehicleType));
  
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
