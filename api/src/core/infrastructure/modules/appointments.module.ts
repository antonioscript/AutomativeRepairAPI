import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { AppointmentsController } from 'src/core/presentation/controllers/appointments.controller';
import { CommandAppointmentHandlers, QueryAppointmentHandlers } from 'src/core/application/handlers/appointment.handlers';
import { AppointmentRepository } from '../Repositories/appointment/appointment.repository';
import { AppointmentPrismaRepository } from '../Repositories/appointment/appointment.prisma.repository';


@Module({
  imports: [CqrsModule],
  controllers: [AppointmentsController],
  providers: [
    ...QueryAppointmentHandlers,
    ...CommandAppointmentHandlers,
    PrismaService,
    {
      provide: AppointmentRepository,
      useFactory: (prisma: PrismaService) => new AppointmentPrismaRepository(prisma),
      inject: [PrismaService]
    },
  ],
})
export class AppointmentsModule {}
