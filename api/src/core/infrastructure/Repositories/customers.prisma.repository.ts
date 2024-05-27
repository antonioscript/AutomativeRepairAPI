import { CustomerEntity } from "src/core/domain/entities/customer.entity";
import { IGenericRepository } from "./igeneric-repository";
import { PrismaService } from "src/core/infrastructure/database/prisma.service";

export class CustomersPrismaRepository extends IGenericRepository<CustomerEntity> {
  
  async getFirstByParameters(...parameters: any[]): Promise<CustomerEntity> {
    return await this.prisma.customer.findFirst({ 
      where: {
          AND: parameters
      } 
    });
  }

  async getAllByParameters(...parameters: any[]): Promise<CustomerEntity[]> {
    return await this.prisma.customer.findMany({ 
      where: {
          AND: parameters
      } 
    });
  }

    constructor(private readonly prisma: PrismaService) {
        super()
      }
    
      async create(data: CustomerEntity): Promise<CustomerEntity> {
        return await this.prisma.customer.create({ 
            data 
        })
      }
    
      async update(id: number, data: CustomerEntity): Promise<CustomerEntity> {
        return await this.prisma.customer.update({
          where: { id },
          data
        })
      }
      
      async getById(id: number): Promise<CustomerEntity> {
        return await this.prisma.customer.findUnique({ 
            where: { 
                id 
            } 
        })
      }
    
      async getAll(): Promise<CustomerEntity[]> {
        return await this.prisma.customer.findMany()
      }

      async delete(id: number): Promise<number> {
        await this.prisma.customer.delete({ 
            where: { 
                id 
            } 
        });
        return id;
      }

      
      
}