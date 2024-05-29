import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from 'src/core/application/use-cases/command-handlers';
import { VehicleTypeRepository } from '../Repositories/vehicleType.repository';
import { VehicleTypesPrismaRepository } from '../Repositories/vehicleTypes.prisma.repository';
import { VehicleTypesController } from 'src/core/presentation/controllers/vehicleTypes.controller';
import { QueryVehicleTypeHandlers } from 'src/core/application/handlers/vehicleTpe/query-vehicleType.handlers';
import { CommandVehicleTypeHandlers } from 'src/core/application/handlers/vehicleTpe/command-VehicleType.handlers';


@Module({
  imports: [CqrsModule],
  controllers: [VehicleTypesController],
  providers: [
    ...QueryVehicleTypeHandlers,
    ...CommandVehicleTypeHandlers,
    PrismaService,
    {
      provide: VehicleTypeRepository,
      useFactory: (prisma: PrismaService) => new VehicleTypesPrismaRepository(prisma),
      inject: [PrismaService]
    },
  ],
})
export class VehicleTypesModule {}
