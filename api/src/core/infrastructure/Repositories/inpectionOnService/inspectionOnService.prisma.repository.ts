import { PrismaService } from "src/core/infrastructure/database/prisma.service";
import { IGenericRepository } from "../igeneric-repository";
import { InspectionOnServiceEntity } from "src/core/domain/entities/inspectionOnService.entity";
import { RequestInspectionOnServiceDto } from "src/core/application/dtos/inspectionOnService/request-InspectionOnService.dto";

export class InspectionOnServicePrismaRepository extends IGenericRepository<InspectionOnServiceEntity> {
  
  async getFirstByParameters(...parameters: any[]): Promise<InspectionOnServiceEntity> {
    return await this.prisma.inspectionOnService.findFirst({ 
      where: {
          AND: parameters
      } 
    });
  }

  async getAllByParameters(...parameters: any[]): Promise<InspectionOnServiceEntity[]> {
    return await this.prisma.inspectionOnService.findMany({ 
      where: {
          AND: parameters
      } 
    });
  }

    constructor(private readonly prisma: PrismaService) {
        super()
      }
    
      async create(data: RequestInspectionOnServiceDto): Promise<InspectionOnServiceEntity> {
        return await this.prisma.inspectionOnService.create({ 
            data 
        })
      }
    
      async update(id: number, data: RequestInspectionOnServiceDto): Promise<InspectionOnServiceEntity> {
        return await this.prisma.inspectionOnService.update({
          where: { id },
          data
        })
      }
      
      async getById(id: number): Promise<InspectionOnServiceEntity> {
        return await this.prisma.inspectionOnService.findUnique({ 
            where: { 
                id 
            },
            include: {
              service: true
            } 
        })
        
      }
    
      async getAll(): Promise<InspectionOnServiceEntity[]> {
        return await this.prisma.inspectionOnService.findMany({
            include: {
              service: true
            } 
        })
      }

      async getPaginated(page: number = 1, pageSize: number = 10): Promise<{ data: InspectionOnServiceEntity[], total: number, lastPage: number, currentPage: number, perPage: number, prev: number | null, next: number | null }> {
        const offset = (page - 1) * pageSize;
    
        const [data, total] = await Promise.all([
          this.prisma.inspectionOnService.findMany({
            take: pageSize,
            skip: offset,
            include: {
              service: true
            } 
          }),
          this.prisma.inspectionOnService.count()
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
        await this.prisma.inspectionOnService.delete({ 
            where: { 
                id 
            } 
        });
        return id;
      }
}