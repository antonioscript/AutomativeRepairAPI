import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, PrismaService],
})
export class CustomersModule {}
