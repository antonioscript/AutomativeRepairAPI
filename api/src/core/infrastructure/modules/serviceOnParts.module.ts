import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryServiceOnPartHandlers, CommandServiceOnPartHandlers } from 'src/core/application/handlers/serviceOnPart.handlers';
import { ServiceOnPartsController } from 'src/core/presentation/controllers/serviceOnparts.controller';
import { ServiceOnPartPrismaRepository } from '../Repositories/serviceOnPart/service.prisma.repository';
import { ServiceOnPartRepository } from '../Repositories/serviceOnPart/serviceOnPart.repository';


@Module({
  imports: [CqrsModule],
  controllers: [ServiceOnPartsController],
  providers: [
    ...QueryServiceOnPartHandlers,
    ...CommandServiceOnPartHandlers,
    PrismaService,
    {
      provide: ServiceOnPartRepository,
      useFactory: (prisma: PrismaService) => new ServiceOnPartPrismaRepository(prisma),
      inject: [PrismaService]
    }
  ],
})
export class ServiceOnPartsModule {}
