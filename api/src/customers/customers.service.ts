import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CustomersService {

  constructor(private prisma: PrismaService) {}

  
  async create(data: CreateCustomerDto) {
    //Ela criou as validações aqui
    const customerExists = await this.prisma.customer.findFirst({
      where: {
        firstName: data.firstName,
        lastName: data.lastName
      }
    });

    if (customerExists) {
      throw new Error("Customer already exists");
    }

    return this.prisma.customer.create({
      data
    });

    //também poderia armazenas o valor em uma variável e retornar depois
    // const costumer = await this.prisma.customer.create({
    //   data
    // });

    // return costumer;
  }


  findAll() {
    return this.prisma.customer.findMany();
  }

  findOne(id: number) {
    return this.prisma.customer.findUnique({
      where: {
        id
      },
    });
  }

  //1º Forma
  // async update(id: number, data: UpdateCustomerDto) {
    
  //   const customerExists = await this.prisma.customer.findUnique({
  //     where: {
  //      id,  
  //     }
  //   });

  //   if (!customerExists)
  //     throw new Error('Customer does not exists');

  //   return await this.prisma.customer.update({
  //     data,
  //     where: {
  //       id,
  //     }
  //   });
  // }

  //2º Forma
  async update(id: number, data : UpdateCustomerDto){
    return this.prisma.customer.update({
      data,
      where: {
        id
      }
    })
  }

  async remove(id: number) {
    return await this.prisma.customer.delete({
      where: {
        id,
      }
    });
  }
}
