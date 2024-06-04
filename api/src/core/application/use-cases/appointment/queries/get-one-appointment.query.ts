import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ResponseAppointmentDto } from "src/core/application/dtos/appointment/response-appointment.dto";
import { ResponseAppointmentMapper } from "src/core/domain/mapping/appointment/response-appointment.mapper";
import { AppointmentRepository } from "src/core/infrastructure/Repositories/appointment/appointment.repository";
import { messages } from "src/core/infrastructure/Shared/messages";
import { Result, result } from "src/core/infrastructure/Shared/result.util";

export class GetOneAppointmentQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetOneAppointmentQuery)
export class GetOneAppointmentHandler implements IQueryHandler<GetOneAppointmentQuery, Result<ResponseAppointmentDto>> {
  private responseMapper: ResponseAppointmentMapper
  constructor ( private readonly repository: AppointmentRepository) {
    this.responseMapper = new ResponseAppointmentMapper()
  }
  
  
  async execute(query: GetOneAppointmentQuery): Promise<Result<ResponseAppointmentDto>> {
    const register = await this.repository.getById(query.id);

    if (!register)
      throw new NotFoundException(messages.APPOINTMENT_NOT_FOUND(query.id))

    const responseData = this.responseMapper.mapTo(register);

    return result(responseData).Success();
  }
  
}
