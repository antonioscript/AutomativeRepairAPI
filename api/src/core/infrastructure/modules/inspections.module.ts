import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { InspectionsController } from 'src/core/presentation/controllers/inspections.controller';
import { CommandInspectionHandlers, QueryInspectionHandlers } from 'src/core/application/handlers/inspection.handlers';
import { InspectionRepository } from '../Repositories/inspection/inspection.repository';
import { InspectionPrismaRepository } from '../Repositories/inspection/inspection.prisma.repository';


@Module({
  imports: [CqrsModule],
  controllers: [InspectionsController],
  providers: [
    ...QueryInspectionHandlers,
    ...CommandInspectionHandlers,
    PrismaService,
    {
      provide: InspectionRepository,
      useFactory: (prisma: PrismaService) => new InspectionPrismaRepository(prisma),
      inject: [PrismaService]
    }
  ],
})
export class InspectionsModule {}
