import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseAppointmentDto } from "src/core/application/dtos/appointment/response-appointment.dto";
import { ResponseAppointmentMapper } from "src/core/domain/mapping/appointment/response-appointment.mapper";
import { AppointmentRepository } from "src/core/infrastructure/Repositories/appointment/appointment.repository";
import { constants } from "src/core/infrastructure/Shared/constants";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetPagedAppointmentsQuery {
  constructor(
    public readonly page: number,
    public readonly pageSize: number
  ) {}
}


@QueryHandler(GetPagedAppointmentsQuery)
export class GetPagedAppointmentsHandler implements IQueryHandler<GetPagedAppointmentsQuery, Result<ResponseAppointmentDto[]>> {
  private responseMapper: ResponseAppointmentMapper;
  constructor(private readonly repository: AppointmentRepository) {
    this.responseMapper = new ResponseAppointmentMapper();
  }

  async execute(query: GetPagedAppointmentsQuery): Promise<Result<ResponseAppointmentDto[]>> {
    
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
