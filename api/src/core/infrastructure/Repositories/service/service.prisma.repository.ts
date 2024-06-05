import { PrismaService } from "src/core/infrastructure/database/prisma.service";
import { IGenericRepository } from "../igeneric-repository";
import { ServiceEntity } from "src/core/domain/entities/service.entity";


export class ServicePrismaRepository extends IGenericRepository<ServiceEntity> {
  
  async getFirstByParameters(...parameters: any[]): Promise<ServiceEntity> {
    return await this.prisma.service.findFirst({ 
      where: {
          AND: parameters
      } 
    });
  }

  async getAllByParameters(...parameters: any[]): Promise<ServiceEntity[]> {
    return await this.prisma.service.findMany({ 
      where: {
          AND: parameters
      } 
    });
  }

    constructor(private readonly prisma: PrismaService) {
        super()
      }
    
      async create(data: ServiceEntity): Promise<ServiceEntity> {
        return await this.prisma.service.create({ 
            data 
        })
      }
    
      async update(id: number, data: ServiceEntity): Promise<ServiceEntity> {
        return await this.prisma.service.update({
          where: { id },
          data
        })
      }
      
      async getById(id: number): Promise<ServiceEntity> {
        return await this.prisma.service.findUnique({ 
            where: { 
                id 
            } 
        })
        
      }
    
      async getAll(): Promise<ServiceEntity[]> {
        return await this.prisma.service.findMany()
      }

      async getPaginated(page: number = 1, pageSize: number = 10): Promise<{ data: ServiceEntity[], total: number, lastPage: number, currentPage: number, perPage: number, prev: number | null, next: number | null }> {
        const offset = (page - 1) * pageSize;
    
        const [data, total] = await Promise.all([
          this.prisma.service.findMany({
            take: pageSize,
            skip: offset
          }),
          this.prisma.service.count()
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
        await this.prisma.service.delete({ 
            where: { 
                id 
            } 
        });
        return id;
      }
}