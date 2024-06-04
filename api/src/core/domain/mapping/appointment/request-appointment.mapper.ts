import { RequestAppointmentDto } from "src/core/application/dtos/appointment/request-appointment.dto"
import { Mapper } from "../mapper"
import { AppointmentEntity } from "../../entities/appointment.entity"

export class RequestAppointmentMapper extends Mapper<RequestAppointmentDto, AppointmentEntity> {
  public mapFrom(data: RequestAppointmentDto): AppointmentEntity {
    const appointment = new AppointmentEntity()

    appointment.customerId = data.customerId;
    appointment.statusId = data.statusId;
    appointment.inspectionDate = data.inspectionDate;
    appointment.observation = data.observation;

    return appointment;
  }

  public mapTo(data: AppointmentEntity): RequestAppointmentDto {
    const appointment = new RequestAppointmentDto()

    appointment.customerId = data.customerId;
    appointment.statusId = data.statusId;
    appointment.inspectionDate = data.inspectionDate;
    appointment.observation = data.observation;

    return appointment;
  }
}
