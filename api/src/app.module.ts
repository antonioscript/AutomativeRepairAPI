import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './core/infrastructure/modules/customers.module';
import { VehicleTypesModule } from './core/infrastructure/modules/vehicleTypes.module';
import { VehiclesModule } from './core/infrastructure/modules/vehicles.module';
import { UsersModule } from './core/infrastructure/modules/users.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

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
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'kasey.heaney31@ethereal.email',
          pass: 'wzVam13bghqcE4rR7N'
        }
      },
      defaults: {
        from: '"Antonio-Rocha-Api" <kasey.heaney31@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates', //Aqui está pedindo a pasta do template, como faço para colocar essa? C:\Projects\AutomativeRepairAPI\api\src\core\presentation\templates
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
