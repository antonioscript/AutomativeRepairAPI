import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandVehicleHandlers, QueryVehicleHandlers } from 'src/core/application/handlers/vehicle.handlers';
import { VehicleRepository } from '../Repositories/vehicle/vehicle.repository';
import { VehiclePrismaRepository } from '../Repositories/vehicle/vehicle.prisma.repository';
import { VehiclesController } from 'src/core/presentation/controllers/vehicles.controller';


@Module({
  imports: [CqrsModule],
  controllers: [VehiclesController],
  providers: [
    ...QueryVehicleHandlers,
    ...CommandVehicleHandlers,
    PrismaService,
    {
      provide: VehicleRepository,
      useFactory: (prisma: PrismaService) => new VehiclePrismaRepository(prisma),
      inject: [PrismaService]
    },
  ],
})
export class VehiclesModule {}
