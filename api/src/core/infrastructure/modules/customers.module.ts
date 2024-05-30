import { Module } from '@nestjs/common';
import { CustomersController } from 'src/core/presentation/controllers/customers.controller';
import { PrismaService } from '../database/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandCustomerHandlers, QueryCustomerHandlers } from 'src/core/application/handlers/customer.handlers';
import { CustomerRepository } from '../Repositories/customer/customer.repository';
import { CustomerPrismaRepository } from '../Repositories/customer/customer.prisma.repository';


@Module({
  imports: [CqrsModule],
  controllers: [CustomersController],
  providers: [
    ...QueryCustomerHandlers,
    ...CommandCustomerHandlers,
    PrismaService,
    {
      provide: CustomerRepository,
      useFactory: (prisma: PrismaService) => new CustomerPrismaRepository(prisma),
      inject: [PrismaService]
    },
  ],
})
export class CustomersModule {}
