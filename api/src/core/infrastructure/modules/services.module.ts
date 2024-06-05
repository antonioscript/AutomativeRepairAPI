import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ServicesController } from 'src/core/presentation/controllers/services.controller';
import { CommandServiceHandlers, QueryServiceHandlers } from 'src/core/application/handlers/service.handlers';
import { ServiceRepository } from '../Repositories/service/service.repository';
import { ServicePrismaRepository } from '../Repositories/service/service.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [ServicesController],
  providers: [
    ...QueryServiceHandlers,
    ...CommandServiceHandlers,
    PrismaService,
    {
      provide: ServiceRepository,
      useFactory: (prisma: PrismaService) => new ServicePrismaRepository(prisma),
      inject: [PrismaService]
    }
  ],
})
export class ServicesModule {}
