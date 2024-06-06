import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { InspectionOnServicesController } from 'src/core/presentation/controllers/inspectionOnServices.controller';
import { CommandInspectionOnServiceHandlers, QueryInspectionOnServiceHandlers } from 'src/core/application/handlers/inspectionOnService.handlers';
import { InspectionOnServiceRepository } from '../Repositories/inpectionOnService/inspectionOnService.repository';
import { InspectionOnServicePrismaRepository } from '../Repositories/inpectionOnService/inspectionOnService.prisma.repository';


@Module({
  imports: [CqrsModule],
  controllers: [InspectionOnServicesController],
  providers: [
    ...QueryInspectionOnServiceHandlers,
    ...CommandInspectionOnServiceHandlers,
    PrismaService,
    {
      provide: InspectionOnServiceRepository,
      useFactory: (prisma: PrismaService) => new InspectionOnServicePrismaRepository(prisma),
      inject: [PrismaService]
    }
  ],
})
export class InspectionOnServicesModule {}
