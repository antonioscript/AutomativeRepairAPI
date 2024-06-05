import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './core/infrastructure/modules/customers.module';
import { VehicleTypesModule } from './core/infrastructure/modules/vehicleTypes.module';
import { VehiclesModule } from './core/infrastructure/modules/vehicles.module';
import { UsersModule } from './core/infrastructure/modules/users.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { AppointmentsModule } from './core/infrastructure/modules/appointments.module';
import { AppointmentsStatusModule } from './core/infrastructure/modules/appointmentsStatus.module';
import { PartsModule } from './core/infrastructure/modules/parts.module';
import { ServicesModule } from './core/infrastructure/modules/services.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    CustomersModule, 
    VehicleTypesModule, 
    VehiclesModule, 
    UsersModule,
    AppointmentsModule,
    AppointmentsStatusModule,
    PartsModule,
    ServicesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
