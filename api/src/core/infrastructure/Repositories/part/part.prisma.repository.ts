import { PrismaService } from "src/core/infrastructure/database/prisma.service";
import { IGenericRepository } from "../igeneric-repository";
import { PartEntity } from "src/core/domain/entities/part.entity";


export class PartPrismaRepository extends IGenericRepository<PartEntity> {
  
  async getFirstByParameters(...parameters: any[]): Promise<PartEntity> {
    return await this.prisma.part.findFirst({ 
      where: {
          AND: parameters
      } 
    });
  }

  async getAllByParameters(...parameters: any[]): Promise<PartEntity[]> {
    return await this.prisma.part.findMany({ 
      where: {
          AND: parameters
      } 
    });
  }

    constructor(private readonly prisma: PrismaService) {
        super()
      }
    
      async create(data: PartEntity): Promise<PartEntity> {
        return await this.prisma.part.create({ 
            data 
        })
      }
    
      async update(id: number, data: PartEntity): Promise<PartEntity> {
        return await this.prisma.part.update({
          where: { id },
          data
        })
      }
      
      async getById(id: number): Promise<PartEntity> {
        return await this.prisma.part.findUnique({ 
            where: { 
                id 
            } 
        })
        
      }
    
      async getAll(): Promise<PartEntity[]> {
        return await this.prisma.part.findMany()
      }

      async getPaginated(page: number = 1, pageSize: number = 10): Promise<{ data: PartEntity[], total: number, lastPage: number, currentPage: number, perPage: number, prev: number | null, next: number | null }> {
        const offset = (page - 1) * pageSize;
    
        const [data, total] = await Promise.all([
          this.prisma.part.findMany({
            take: pageSize,
            skip: offset
          }),
          this.prisma.part.count()
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
        await this.prisma.part.delete({ 
            where: { 
                id 
            } 
        });
        return id;
      }
}