import { UpdateAppointmentStatusDto } from "src/core/application/dtos/appointmentStatus/update-appointmentStatus.dto";
import { Mapper } from "../mapper"
import { AppointmentStatusEntity } from "../../entities/appointmentStatus.entity";


export class UpdateAppointmentStatusMapper extends Mapper<UpdateAppointmentStatusDto, AppointmentStatusEntity> {
  public mapFrom(data: UpdateAppointmentStatusDto): AppointmentStatusEntity {
    const appointmentStatus = new AppointmentStatusEntity()

    appointmentStatus.id = data.id
    appointmentStatus.name = data.name;

    return appointmentStatus;
  }

  public mapTo(data: AppointmentStatusEntity): UpdateAppointmentStatusDto {
    const appointmentStatus = new UpdateAppointmentStatusDto()

    appointmentStatus.id = data.id
    appointmentStatus.name = data.name;

    return appointmentStatus;
  }
}
