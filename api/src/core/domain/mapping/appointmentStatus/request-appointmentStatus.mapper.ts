import { RequestAppointmentStatusDto } from "src/core/application/dtos/appointmentStatus/request-appointmentStatus.dto";
import { AppointmentStatusEntity } from "../../entities/appointmentStatus.entity";
import { Mapper } from "../mapper"

export class RequestAppointmentStatusMapper extends Mapper<RequestAppointmentStatusDto, AppointmentStatusEntity> {
  public mapFrom(data: RequestAppointmentStatusDto): AppointmentStatusEntity {
    const appointmentStatus = new AppointmentStatusEntity()

    appointmentStatus.name = data.name;

    return appointmentStatus;
  }

  public mapTo(data: AppointmentStatusEntity): RequestAppointmentStatusDto {
    const appointmentStatus = new RequestAppointmentStatusDto()

    appointmentStatus.name = data.name;

    return appointmentStatus;
  }
}
