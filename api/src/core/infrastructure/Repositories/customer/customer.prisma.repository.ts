import { CustomerEntity } from "src/core/domain/entities/customer.entity";
import { PrismaService } from "src/core/infrastructure/database/prisma.service";
import { IGenericRepository } from "../igeneric-repository";


interface PaginatedData<T> {
  data: T[];
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
}

export class CustomerPrismaRepository extends IGenericRepository<CustomerEntity> {
  
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

      async getPagination(page: number = 1, pageSize: number = 10): Promise<{ data: CustomerEntity[], total: number, lastPage: number, currentPage: number, perPage: number, prev: number | null, next: number | null }> {
        const offset = (page - 1) * pageSize;
    
        const [data, total] = await Promise.all([
          this.prisma.customer.findMany({
            take: pageSize,
            skip: offset
          }),
          this.prisma.customer.count()
        ]);
    
        const lastPage = Math.ceil(total / pageSize);
        const prev = page > 1 ? page - 1 : null;
        const next = page < lastPage ? page + 1 : null;
    
        return {
          data,
          total,
          lastPage,
          currentPage: page,
          perPage: pageSize,
          prev,
          next
        };
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