import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { PartsController } from 'src/core/presentation/controllers/parts.controller';
import { CommandPartHandlers, QueryPartHandlers } from 'src/core/application/handlers/PART.handlers';
import { PartRepository } from '../Repositories/part/part.repository';
import { PartPrismaRepository } from '../Repositories/part/part.prisma.repository';


@Module({
  imports: [CqrsModule],
  controllers: [PartsController],
  providers: [
    ...QueryPartHandlers,
    ...CommandPartHandlers,
    PrismaService,
    {
      provide: PartRepository,
      useFactory: (prisma: PrismaService) => new PartPrismaRepository(prisma),
      inject: [PrismaService]
    }
  ],
  exports:[PartRepository]
})
export class PartsModule {}
