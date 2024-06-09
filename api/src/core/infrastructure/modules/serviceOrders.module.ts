import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { InspectionRepository } from '../Repositories/inspection/inspection.repository';
import { InspectionPrismaRepository } from '../Repositories/inspection/inspection.prisma.repository';
import { ServiceOrdersController } from 'src/core/presentation/controllers/serviceOrders.controller';
import { CommandServiceOrderHandlers, QueryServiceOrderHandlers } from 'src/core/application/handlers/serviceOrder.handlers';
import { InspectionsModule } from './inspections.module';
import { InspectionOnServicesModule } from './inspectionOnServices.module';
import { ServiceOnPartsModule } from './serviceOnParts.module';
import { ServicesModule } from './services.module';
import { PartsModule } from './parts.module';
import { ServiceOrderRules } from 'src/core/application/rules/serviceOrder.rules';


@Module({
  imports: [
    CqrsModule, 
    InspectionsModule, 
    InspectionOnServicesModule,
    ServiceOnPartsModule,
    ServicesModule,
    PartsModule
  ],
  controllers: [ServiceOrdersController],
  providers: [
    ...QueryServiceOrderHandlers,
    ...CommandServiceOrderHandlers,
    PrismaService,
    {
      provide: InspectionRepository,
      useFactory: (prisma: PrismaService) => new InspectionPrismaRepository(prisma),
      inject: [PrismaService]
    },
    ServiceOrderRules
  ],
})
export class ServiceOrdesModule {}
