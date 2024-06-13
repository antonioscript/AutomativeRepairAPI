import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryServiceOnPartHandlers, CommandServiceOnPartHandlers } from 'src/core/application/handlers/serviceOnPart.handlers';
import { ServiceOnPartRepository } from '../Repositories/serviceOnPart/serviceOnPart.repository';
import { ServiceOnPartPrismaRepository } from '../Repositories/serviceOnPart/serviceOnPart.prisma.repository';


@Module({
  imports: [CqrsModule],
  //controllers: [ServiceOnPartsController],
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
  exports: [ServiceOnPartRepository]
})
export class ServiceOnPartsModule {}
