import { PrismaService } from "src/core/infrastructure/database/prisma.service";
import { IGenericRepository } from "../igeneric-repository";
import { InspectionEntity } from "src/core/domain/entities/inspection.entity";

export class InspectionPrismaRepository extends IGenericRepository<InspectionEntity> {
  
  async getFirstByParameters(...parameters: any[]): Promise<InspectionEntity> {
    return await this.prisma.inspection.findFirst({ 
      where: {
          AND: parameters
      } 
    });
  }

  async getAllByParameters(...parameters: any[]): Promise<InspectionEntity[]> {
    return await this.prisma.inspection.findMany({ 
      where: {
          AND: parameters
      } 
    });
  }

    constructor(private readonly prisma: PrismaService) {
        super()
      }
    
      async create(data: InspectionEntity): Promise<InspectionEntity> {
        return await this.prisma.inspection.create({ 
            data 
        })
      }
    
      async update(id: number, data: InspectionEntity): Promise<InspectionEntity> {
        return await this.prisma.inspection.update({
          where: { id },
          data
        })
      }
      
      async getById(id: number): Promise<InspectionEntity> {
        return await this.prisma.inspection.findUnique({ 
            where: { 
                id 
            } 
        })
        
      }
    
      async getAll(): Promise<InspectionEntity[]> {
        return await this.prisma.inspection.findMany()
      }

      async getPaginated(page: number = 1, pageSize: number = 10): Promise<{ data: InspectionEntity[], total: number, lastPage: number, currentPage: number, perPage: number, prev: number | null, next: number | null }> {
        const offset = (page - 1) * pageSize;
    
        const [data, total] = await Promise.all([
          this.prisma.inspection.findMany({
            take: pageSize,
            skip: offset
          }),
          this.prisma.inspection.count()
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
        await this.prisma.inspection.delete({ 
            where: { 
                id 
            } 
        });
        return id;
      }
}