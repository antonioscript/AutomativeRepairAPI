import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from 'src/core/presentation/controllers/users.controller';
import { CommandUserHandlers, QueryUserHandlers } from 'src/core/application/handlers/user.handlers';
import { UserRepository } from '../Repositories/user/user.repository';
import { UserPrismaRepository } from '../Repositories/user/user.prisma.repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../Shared/auth.service';


@Module({
  imports: [
    CqrsModule,
    JwtModule.register({
      secret: "rLtGWPE27rM0qbGc5fWNMHhA93738KQa"
  }),
  ],
  controllers: [AuthController],
  providers: [
    ...QueryUserHandlers,
    ...CommandUserHandlers,
    PrismaService,
    {
      provide: UserRepository,
      useFactory: (prisma: PrismaService) => new UserPrismaRepository(prisma),
      inject: [PrismaService]
    },
    AuthService
  ],
  //exports: [UserPrismaRepository]
})
export class UsersModule {}
