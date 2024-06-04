import { UpdateAppointmentDto } from "src/core/application/dtos/appointment/update-appointment.dto"
import { Mapper } from "../mapper"
import { AppointmentEntity } from "../../entities/appointment.entity"


export class UpdateAppointmentMapper extends Mapper<UpdateAppointmentDto, AppointmentEntity> {
  public mapFrom(data: UpdateAppointmentDto): AppointmentEntity {
    const appointment = new AppointmentEntity()

    appointment.id = data.id
    appointment.customerId = data.customerId;
    appointment.statusId = data.statusId;
    appointment.inspectionDate = data.inspectionDate;
    appointment.observation = data.observation;

    return appointment;
  }

  public mapTo(data: AppointmentEntity): UpdateAppointmentDto {
    const appointment = new UpdateAppointmentDto()

    appointment.id = data.id
    appointment.customerId = data.customerId;
    appointment.statusId = data.statusId;
    appointment.inspectionDate = data.inspectionDate;
    appointment.observation = data.observation;

    return appointment;
  }
}
