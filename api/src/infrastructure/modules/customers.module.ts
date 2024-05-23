import { Module } from '@nestjs/common';
import { CustomersController } from 'src/presentation/controllers/customers.controller';
import { PrismaService } from '../database/prisma.service';
import { CustomerRepository } from '../Repositories/customer.repository';
import { CustomersPrismaRepository } from '../Repositories/customers.prisma.repository';
import { DeleteCustomerUseCase } from 'src/application/use-cases/custumer/delete-customer.use-case';
import { GetOneCustomerUseCase } from 'src/application/use-cases/custumer/get-one-customer.use-case';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from 'src/application/use-cases/command-handlers';
import { QueryHandlers } from 'src/application/use-cases/query-handlers';


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
    {
      provide: DeleteCustomerUseCase,
      useFactory: (repository: CustomerRepository) => new DeleteCustomerUseCase(repository),
      inject: [CustomerRepository]
    },
    {
      provide: GetOneCustomerUseCase,
      useFactory: (repository: CustomerRepository) => new GetOneCustomerUseCase(repository),
      inject: [CustomerRepository]
    }
  ],
})
export class CustomersModule {}
