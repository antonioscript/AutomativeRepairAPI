import { CustomerEntity } from "src/customers/entities/customer.entity";
import { IGenericRepository } from "./igeneric-repository";
import { PrismaService } from "src/database/prisma.service";

export class CustomersPrismaRepository extends IGenericRepository<CustomerEntity> {

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

      async delete(id: number): Promise<void> {
        await this.prisma.customer.delete({ 
            where: { 
                id 
            } 
        })
      }
}