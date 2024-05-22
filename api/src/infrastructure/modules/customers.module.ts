import { Module } from '@nestjs/common';
import { CustomersController } from 'src/presentation/controllers/customers.controller';
import { PrismaService } from '../database/prisma.service';
import { CustomerRepository } from '../Repositories/customer.repository';
import { CustomersPrismaRepository } from '../Repositories/customers.prisma.repository';
import { CreateCustomerUseCase } from 'src/application/use-cases/custumer/create-customer.use-case';
import { UpdateCustomerUseCase } from 'src/application/use-cases/custumer/update-customer.use-case';
import { DeleteCustomerUseCase } from 'src/application/use-cases/custumer/delete-customer.use-case';
import { GetOneCustomerUseCase } from 'src/application/use-cases/custumer/get-one-customer.use-case';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from 'src/application/use-cases/custumer/handlers';


@Module({
  imports: [CqrsModule],
  controllers: [CustomersController],
  providers: [
    ...QueryHandlers,
    PrismaService,
    {
      provide: CustomerRepository,
      useFactory: (prisma: PrismaService) => new CustomersPrismaRepository(prisma),
      inject: [PrismaService]
    },
    {
      provide: CreateCustomerUseCase,
      useFactory: (repository: CustomerRepository) => new CreateCustomerUseCase(repository),
      inject: [CustomerRepository]
    },
    {
      provide: UpdateCustomerUseCase,
      useFactory: (repository: CustomerRepository) => new UpdateCustomerUseCase(repository),
      inject: [CustomerRepository]
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
