import { Module } from '@nestjs/common';
import { CustomersController } from 'src/core/presentation/controllers/customers.controller';
import { PrismaService } from '../database/prisma.service';
import { CustomerRepository } from '../Repositories/customer.repository';
import { CustomersPrismaRepository } from '../Repositories/customers.prisma.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from 'src/core/application/use-cases/command-handlers';
import { QueryHandlers } from 'src/core/application/use-cases/query-handlers';


@Module({
  imports: [CqrsModule],
  controllers: [CustomersController],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    PrismaService,
    {
      provide: CustomerRepository,
      useFactory: (prisma: PrismaService) => new CustomersPrismaRepository(prisma),
      inject: [PrismaService]
    },
  ],
})
export class CustomersModule {}
