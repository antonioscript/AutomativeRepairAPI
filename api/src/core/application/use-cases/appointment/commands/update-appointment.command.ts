import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { BadRequestException, NotFoundException } from "@nestjs/common"
import { messages } from "src/core/infrastructure/Shared/messages"
import { UpdateAppointmentDto } from "src/core/application/dtos/appointment/update-appointment.dto"
import { UpdateAppointmentMapper } from "src/core/domain/mapping/appointment/update-appointment.mapper"
import { ResponseAppointmentMapper } from "src/core/domain/mapping/appointment/response-appointment.mapper"
import { ResponseAppointmentDto } from "src/core/application/dtos/appointment/response-appointment.dto"
import { AppointmentRepository } from "src/core/infrastructure/Repositories/appointment/appointment.repository"

export class UpdateAppointmentCommand {
  constructor(
    public readonly id: number,
    public readonly request: UpdateAppointmentDto
  ) {}
}

@CommandHandler(UpdateAppointmentCommand)
export class UpdateAppointmentHandler implements ICommandHandler<UpdateAppointmentCommand, Result<ResponseAppointmentDto>> {
  private updateMapper: UpdateAppointmentMapper
  private responseMapper: ResponseAppointmentMapper

  constructor(private readonly repository: AppointmentRepository) {
    this.updateMapper = new UpdateAppointmentMapper()
    this.responseMapper = new ResponseAppointmentMapper()
  }

  async execute(command: UpdateAppointmentCommand): Promise<Result<ResponseAppointmentDto>> {

    if (command.id != command.request.id)
      throw new BadRequestException(messages.DEFAULT_UPDATE_BAD_REQUEST);

    const register  = await this.repository.getById(command.id);
    if (!register) {
      throw new NotFoundException(messages.APPOINTMENT_NOT_FOUND(command.id));

    } else {

      const entity = this.updateMapper.mapFrom(command.request);
      const responseAppointment = await this.repository.update(command.id, entity)
      const responseData =  this.responseMapper.mapTo(responseAppointment)

      return result(responseData).Success();
    }
  }
}
