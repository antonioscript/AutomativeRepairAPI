import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './core/infrastructure/modules/customers.module';
import { VehicleTypesModule } from './core/infrastructure/modules/vehicleTypes.module';
import { VehiclesModule } from './core/infrastructure/modules/vehicles.module';

@Module({
  imports: [CustomersModule, VehicleTypesModule, VehiclesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
