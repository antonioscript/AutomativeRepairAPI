import { Controller, Get, Post, Put, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestCustomerDto } from 'src/core/application/dtos/customer/request-customer.dto';
import { UpdateCustomerDto } from 'src/core/application/dtos/customer/update-customer.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCustomerCommand } from 'src/core/application/use-cases/custumer/commands/create-customer.command';
import { GetOneCustomerQuery } from 'src/core/application/use-cases/custumer/queries/get-one-customer.query';
import { GetAllCustomersQuery } from 'src/core/application/use-cases/custumer/queries/get-all-customers.query';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCustomerCommand } from 'src/core/application/use-cases/custumer/commands/update-customer.command';
import { DeleteCustomerCommand } from 'src/core/application/use-cases/custumer/commands/delete-customer.command';
import { MailerService } from '@nestjs-modules/mailer';


@Controller('customers')
@ApiTags('customers')
export class CustomersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly mailer: MailerService

  ) {}
  
  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAllCustomersQuery());
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const numberId = Number(id);
    return this.queryBus.execute(new GetOneCustomerQuery(numberId));
  }

  @Post()
  async create(@Body() request: RequestCustomerDto) {
    return await this.commandBus.execute(new CreateCustomerCommand(request));
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() request: UpdateCustomerDto) {
    const numberId = Number(id);
    return await this.commandBus.execute(new UpdateCustomerCommand(numberId, request));
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const numberId = Number(id);
    return await this.commandBus.execute(new DeleteCustomerCommand(numberId))
  }

  @Post('sendEmail')
  async send() {
    try {
      await this.mailer.sendMail({
        subject: 'Recuperaçã de senha',
        to: 'antoniojunior159@gmail.com',
        template: 'forget',
        context: {
          name: 'Antônio Rocha',
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsIm5hbWUiOiJTYXRvcm8iLCJlbWFpbCI6InNhdG9yb0BnbWFpbC5jb20iLCJpYXQiOjE3MTcxOTI1NTUsImV4cCI6MTcxNzc5NzM1NSwiYXVkIjoidXNlcnMiLCJpc3MiOiJsb2dpbiIsInN1YiI6IjEyIn0.Apx8Qrc92jW9GhvAbB2c2TDyaTMKvA3V7HK4HHF1x3Q'
        }
      });

      return "Email Enviado com Sucesso";

    } catch (ex) {
      return ex;
    }
  }
}
