
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { BadRequestException } from "@nestjs/common"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { messages } from "src/core/infrastructure/Shared/messages"
import { RequestAppointmentMapper } from "src/core/domain/mapping/appointment/request-appointment.mapper"
import { ResponseAppointmentMapper } from "src/core/domain/mapping/appointment/response-appointment.mapper"
import { RequestAppointmentDto } from "src/core/application/dtos/appointment/request-appointment.dto"
import { AppointmentRepository } from "src/core/infrastructure/Repositories/appointment/appointment.repository"
import { ResponseAppointmentDto } from "src/core/application/dtos/appointment/response-appointment.dto"
import { constants } from "src/core/infrastructure/Shared/constants"

export class CreateAppointmentCommand {
  constructor(public readonly request: RequestAppointmentDto) {}
}

@CommandHandler(CreateAppointmentCommand)
export class CreateAppointmentHandler implements ICommandHandler<CreateAppointmentCommand, Result<ResponseAppointmentDto>> {
  private requestMapper: RequestAppointmentMapper
  private responseMapper: ResponseAppointmentMapper

  constructor(private readonly repository: AppointmentRepository) {
    this.requestMapper = new RequestAppointmentMapper()
    this.responseMapper = new ResponseAppointmentMapper()
  }

  async execute(command: CreateAppointmentCommand): Promise<Result<ResponseAppointmentDto>> {

    //TO DO - Criar a condição para não cadastrar registros iguais

    const entity = this.requestMapper.mapFrom(command.request);
    entity.statusId = constants.APPOINTMENT_STATUS_DEFAULT;

    const responseEntity = await this.repository.create(entity);
    const responseData = this.responseMapper.mapTo(responseEntity);
    
    return result(responseData).Success();
  }
}