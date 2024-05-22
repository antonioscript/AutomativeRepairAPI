import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CustomerRepository } from 'src/base/customer.repository';
import { CustomersPrismaRepository } from 'src/base/customers.prisma.repository';
import { CreateCustomerUseCase } from './create-customer.use-case';
import { GetAllCustomersUseCase } from './get-all-customers.use-case';
import { GetOneCustomerUseCase } from './get-one-customer.use-case';
import { UpdateCustomerUseCase } from './update-customer.use-case';
import { DeleteCustomerUseCase } from './delete-customer.use-case';

@Module({
  controllers: [CustomersController],
  providers: [
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
      provide: GetAllCustomersUseCase,
      useFactory: (repository: CustomerRepository) => new GetAllCustomersUseCase(repository),
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
