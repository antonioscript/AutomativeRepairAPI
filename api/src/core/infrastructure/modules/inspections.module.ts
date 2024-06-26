import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { InspectionsController } from 'src/core/presentation/controllers/inspections.controller';
import { CommandInspectionHandlers, QueryInspectionHandlers } from 'src/core/application/handlers/inspection.handlers';
import { InspectionRepository } from '../Repositories/inspection/inspection.repository';
import { InspectionPrismaRepository } from '../Repositories/inspection/inspection.prisma.repository';
import { ServicesModule } from './services.module';


@Module({
  imports: [CqrsModule, ServicesModule],
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
  exports: [InspectionRepository]
})
export class InspectionsModule {}
