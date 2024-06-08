import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { InspectionRepository } from '../Repositories/inspection/inspection.repository';
import { InspectionPrismaRepository } from '../Repositories/inspection/inspection.prisma.repository';
import { ServiceOrdersController } from 'src/core/presentation/controllers/serviceOrders.controller';
import { CommandServiceOrderHandlers, QueryServiceOrderHandlers } from 'src/core/application/handlers/serviceOrder.handlers';
import { InspectionsModule } from './inspections.module';


@Module({
  imports: [CqrsModule, InspectionsModule],
  controllers: [ServiceOrdersController],
  providers: [
    ...QueryServiceOrderHandlers,
    ...CommandServiceOrderHandlers,
    PrismaService,
    {
      provide: InspectionRepository,
      useFactory: (prisma: PrismaService) => new InspectionPrismaRepository(prisma),
      inject: [PrismaService]
    }
  ],
})
export class ServiceOrdesModule {}
