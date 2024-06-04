import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseAppointmentDto } from "src/core/application/dtos/appointment/response-appointment.dto";
import { ResponseAppointmentMapper } from "src/core/domain/mapping/appointment/response-appointment.mapper";
import { AppointmentRepository } from "src/core/infrastructure/Repositories/appointment/appointment.repository";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetAllAppointmentsQuery {

}

@QueryHandler(GetAllAppointmentsQuery)
export class GetAllAppointmentsHandler implements IQueryHandler<GetAllAppointmentsQuery, Result<ResponseAppointmentDto[]>> {
  private responseMapper: ResponseAppointmentMapper
  constructor ( private readonly repository: AppointmentRepository) {
    this.responseMapper = new ResponseAppointmentMapper()
  }
  
  
  async execute(query: GetAllAppointmentsQuery): Promise<Result<ResponseAppointmentDto[]>> {
    const registers = await this.repository.getAll();
    const responseData =  registers.map(entity => this.responseMapper.mapTo(entity))

    return result(responseData).Success();
  }
  
}
