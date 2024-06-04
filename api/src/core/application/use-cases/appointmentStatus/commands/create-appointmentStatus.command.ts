
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { BadRequestException } from "@nestjs/common"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { messages } from "src/core/infrastructure/Shared/messages"
import { RequestAppointmentStatusDto } from "src/core/application/dtos/appointmentStatus/request-appointmentStatus.dto"
import { ResponseAppointmentStatusDto } from "src/core/application/dtos/appointmentStatus/response-appointmentStatusdto"
import { RequestAppointmentStatusMapper } from "src/core/domain/mapping/appointmentStatus/request-appointmentStatus.mapper"
import { ResponseAppointmentStatusMapper } from "src/core/domain/mapping/appointmentStatus/response-appointmentStatus.mapper"
import { AppointmentStatusRepository } from "src/core/infrastructure/Repositories/appointmentStatus/appointmentStatus.repository"

export class CreateAppointmentStatusCommand {
  constructor(public readonly request: RequestAppointmentStatusDto) {}
}

@CommandHandler(CreateAppointmentStatusCommand)
export class CreateAppointmentStatusHandler implements ICommandHandler<CreateAppointmentStatusCommand, Result<ResponseAppointmentStatusDto>> {
  private requestMapper: RequestAppointmentStatusMapper
  private responseMapper: ResponseAppointmentStatusMapper

  constructor(private readonly repository: AppointmentStatusRepository) {
    this.requestMapper = new RequestAppointmentStatusMapper()
    this.responseMapper = new ResponseAppointmentStatusMapper()
  }

  async execute(command: CreateAppointmentStatusCommand): Promise<Result<ResponseAppointmentStatusDto>> {

    const registerExists = await this.repository.getFirstByParameters({
      name: command.request.name
    });

    if (registerExists)
      throw new BadRequestException(messages.APPOINTMENT_STATUS_ALREADY_EXISTS(command.request.name));

    const entity = this.requestMapper.mapFrom(command.request);
    const responseEntity = await this.repository.create(entity);
    const responseData = this.responseMapper.mapTo(responseEntity);
    
    return result(responseData).Success();
  }
}