import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseAppointmentStatusDto } from "src/core/application/dtos/appointmentStatus/response-appointmentStatusdto";
import { ResponseAppointmentStatusMapper } from "src/core/domain/mapping/appointmentStatus/response-appointmentStatus.mapper";
import { AppointmentStatusRepository } from "src/core/infrastructure/Repositories/appointmentStatus/appointmentStatus.repository";
import { messages } from "src/core/infrastructure/Shared/messages";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetOneAppointmentStatusQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetOneAppointmentStatusQuery)
export class GetOneAppointmentStatusHandler implements IQueryHandler<GetOneAppointmentStatusQuery, Result<ResponseAppointmentStatusDto>> {
  private responseMapper: ResponseAppointmentStatusMapper
  constructor ( private readonly repository: AppointmentStatusRepository) {
    this.responseMapper = new ResponseAppointmentStatusMapper()
  }
  
  
  async execute(query: GetOneAppointmentStatusQuery): Promise<Result<ResponseAppointmentStatusDto>> {
    const register = await this.repository.getById(query.id);

    if (!register)
      throw new NotFoundException(messages.APPOINTMENT_STATUS_NOT_FOUND(query.id))

    const responseData = this.responseMapper.mapTo(register);

    return result(responseData).Success();
  }
  
}
