import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersController } from 'src/core/presentation/controllers/users.controller';
import { CommandUserHandlers, QueryUserHandlers } from 'src/core/application/handlers/user.handlers';
import { UserRepository } from '../Repositories/user/user.repository';
import { UserPrismaRepository } from '../Repositories/user/user.prisma.repository';


@Module({
  imports: [CqrsModule],
  controllers: [UsersController],
  providers: [
    ...QueryUserHandlers,
    ...CommandUserHandlers,
    PrismaService,
    {
      provide: UserRepository,
      useFactory: (prisma: PrismaService) => new UserPrismaRepository(prisma),
      inject: [PrismaService]
    },
  ],
})
export class UsersModule {}
