import { ResponseAppointmentDto } from "src/core/application/dtos/appointment/response-appointment.dto"
import { Mapper } from "../mapper"
import { AppointmentEntity } from "../../entities/appointment.entity"



export class ResponseAppointmentMapper extends Mapper<ResponseAppointmentDto, AppointmentEntity> {
  public mapFrom(data: ResponseAppointmentDto): AppointmentEntity {
    const appointment = new AppointmentEntity()

    appointment.id = data.id
    appointment.customerId = data.customerId;
    appointment.customer = data.customer;
    
    appointment.statusId = data.statusId;
    appointment.status = data.status;

    appointment.inspectionDate = data.inspectionDate;
    appointment.observation = data.observation;

    return appointment;
  }

  public mapTo(data: AppointmentEntity): ResponseAppointmentDto {
    const appointment = new ResponseAppointmentDto()

    appointment.id = data.id
    
    appointment.customerId = data.customerId;
    appointment.customer = data.customer;

    appointment.statusId = data.statusId;
    appointment.status = data.status;

    appointment.inspectionDate = data.inspectionDate;
    appointment.observation = data.observation;
    
    return appointment
  }
}
