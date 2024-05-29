import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { VehicleTypesController } from 'src/core/presentation/controllers/vehicleTypes.controller';
import { CommandVehicleTypeHandlers, QueryVehicleTypeHandlers } from 'src/core/application/handlers/vehicleType.handlers';
import { VehicleTypePrismaRepository } from '../Repositories/vehicleType/vehicleType.prisma.repository';
import { VehicleTypeRepository } from '../Repositories/vehicleType/vehicleType.repository';


@Module({
  imports: [CqrsModule],
  controllers: [VehicleTypesController],
  providers: [
    ...QueryVehicleTypeHandlers,
    ...CommandVehicleTypeHandlers,
    PrismaService,
    {
      provide: VehicleTypeRepository,
      useFactory: (prisma: PrismaService) => new VehicleTypePrismaRepository(prisma),
      inject: [PrismaService]
    },
  ],
})
export class VehicleTypesModule {}
