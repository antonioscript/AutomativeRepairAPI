import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { AppointmentStatusRepository } from '../Repositories/appointmentStatus/appointmentStatus.repository';
import { AppointmentStatusController } from 'src/core/presentation/controllers/appointmentsStatus.controller';
import { AppointmentStatusPrismaRepository } from '../Repositories/appointmentStatus/appointmentStatus.prisma.repository';
import { CommandAppointmentStatusHandlers, QueryAppointmentStatusHandlers } from 'src/core/application/handlers/appointmentStatus.handlers';



@Module({
  imports: [CqrsModule],
  controllers: [AppointmentStatusController],
  providers: [
    ...QueryAppointmentStatusHandlers,
    ...CommandAppointmentStatusHandlers,
    PrismaService,
    {
      provide: AppointmentStatusRepository,
      useFactory: (prisma: PrismaService) => new AppointmentStatusPrismaRepository(prisma),
      inject: [PrismaService]
    },
  ],
})
export class AppointmentsStatusModule {}
