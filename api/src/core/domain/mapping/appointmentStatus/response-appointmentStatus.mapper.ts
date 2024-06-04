import { ResponseAppointmentStatusDto } from "src/core/application/dtos/appointmentStatus/response-appointmentStatusdto";
import { Mapper } from "../mapper"
import { AppointmentStatusEntity } from "../../entities/appointmentStatus.entity";



export class ResponseAppointmentStatusMapper extends Mapper<ResponseAppointmentStatusDto, AppointmentStatusEntity> {
  public mapFrom(data: ResponseAppointmentStatusDto): AppointmentStatusEntity {
    const appointmentStatus = new AppointmentStatusEntity()

    appointmentStatus.id = data.id
    appointmentStatus.name = data.name;

    return appointmentStatus;
  }

  public mapTo(data: AppointmentStatusEntity): ResponseAppointmentStatusDto {
    const appointmentStatus = new ResponseAppointmentStatusDto()

    appointmentStatus.id = data.id
    appointmentStatus.name = data.name;

    return appointmentStatus;    
  }
}
