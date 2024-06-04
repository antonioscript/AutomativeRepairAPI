import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseAppointmentDto } from "src/core/application/dtos/appointment/response-appointment.dto";
import { ResponseAppointmentStatusDto } from "src/core/application/dtos/appointmentStatus/response-appointmentStatusdto";
import { ResponseAppointmentStatusMapper } from "src/core/domain/mapping/appointmentStatus/response-appointmentStatus.mapper";
import { AppointmentStatusRepository } from "src/core/infrastructure/Repositories/appointmentStatus/appointmentStatus.repository";
import { constants } from "src/core/infrastructure/Shared/constants";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetPagedAppointmentStatusQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number
  ) {}
}


@QueryHandler(GetPagedAppointmentStatusQuery)
export class GetPagedAppointmentStatusHandler implements IQueryHandler<GetPagedAppointmentStatusQuery, Result<ResponseAppointmentStatusDto[]>> {
  private responseMapper: ResponseAppointmentStatusMapper;
  constructor(private readonly repository: AppointmentStatusRepository) {
    this.responseMapper = new ResponseAppointmentStatusMapper();
  }

  async execute(query: GetPagedAppointmentStatusQuery): Promise<Result<ResponseAppointmentStatusDto[]>> {
    
    let { page, pageSize } = query;
    
    if (isNaN(page)) {
      page = constants.PAGE_DEFAULT;
    }
    if (isNaN(pageSize)) {
      pageSize = constants.PAGE_SIZE_DEFAULT;
    }

    const { data, total, lastPage, currentPage, perPage, prev, next } = await this.repository.getPaginated(page, pageSize);
  
    const responseData = data.map(entity => this.responseMapper.mapTo(entity));
  
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
