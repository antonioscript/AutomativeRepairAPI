import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseAppointmentStatusDto } from "src/core/application/dtos/appointmentStatus/response-appointmentStatusdto";
import { ResponseAppointmentStatusMapper } from "src/core/domain/mapping/appointmentStatus/response-appointmentStatus.mapper";
import { AppointmentStatusRepository } from "src/core/infrastructure/Repositories/appointmentStatus/appointmentStatus.repository";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetAllAppointmentStatusQuery {

}

@QueryHandler(GetAllAppointmentStatusQuery)
export class GetAllAppointmentStatusHandler implements IQueryHandler<GetAllAppointmentStatusQuery, Result<ResponseAppointmentStatusDto[]>> {
  private responseMapper: ResponseAppointmentStatusMapper
  constructor ( private readonly repository: AppointmentStatusRepository) {
    this.responseMapper = new ResponseAppointmentStatusMapper()
  }
  
  
  async execute(query: GetAllAppointmentStatusQuery): Promise<Result<ResponseAppointmentStatusDto[]>> {
    const registers = await this.repository.getAll();
    const responseData =  registers.map(entity => this.responseMapper.mapTo(entity))

    return result(responseData).Success();
  }
  
}
