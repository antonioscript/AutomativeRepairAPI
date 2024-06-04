import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { BadRequestException, NotFoundException } from "@nestjs/common"
import { messages } from "src/core/infrastructure/Shared/messages"
import { UpdateAppointmentStatusDto } from "src/core/application/dtos/appointmentStatus/update-appointmentStatus.dto"
import { ResponseAppointmentStatusDto } from "src/core/application/dtos/appointmentStatus/response-appointmentStatusdto"
import { UpdateAppointmentStatusMapper } from "src/core/domain/mapping/appointmentStatus/update-appointmentStatus.mapper"
import { AppointmentStatusRepository } from "src/core/infrastructure/Repositories/appointmentStatus/appointmentStatus.repository"
import { ResponseAppointmentStatusMapper } from "src/core/domain/mapping/appointmentStatus/response-appointmentStatus.mapper"

export class UpdateAppointmentStatusCommand {
  constructor(
    public readonly id: number,
    public readonly request: UpdateAppointmentStatusDto
  ) {}
}

@CommandHandler(UpdateAppointmentStatusCommand)
export class UpdateAppointmentStatusHandler implements ICommandHandler<UpdateAppointmentStatusCommand, Result<ResponseAppointmentStatusDto>> {
  private updateMapper: UpdateAppointmentStatusMapper
  private responseMapper: ResponseAppointmentStatusMapper

  constructor(private readonly repository: AppointmentStatusRepository) {
    this.updateMapper = new UpdateAppointmentStatusMapper()
    this.responseMapper = new ResponseAppointmentStatusMapper()
  }

  async execute(command: UpdateAppointmentStatusCommand): Promise<Result<ResponseAppointmentStatusDto>> {

    if (command.id != command.request.id)
      throw new BadRequestException(messages.DEFAULT_UPDATE_BAD_REQUEST);

    const register  = await this.repository.getById(command.id);
    if (!register) {
      throw new NotFoundException(messages.APPOINTMENT_STATUS_NOT_FOUND(command.id));

    } else {

      const entity = this.updateMapper.mapFrom(command.request);
      const responseAppointmentStatus = await this.repository.update(command.id, entity)
      const responseData =  this.responseMapper.mapTo(responseAppointmentStatus)

      return result(responseData).Success();
    }
  }
}
