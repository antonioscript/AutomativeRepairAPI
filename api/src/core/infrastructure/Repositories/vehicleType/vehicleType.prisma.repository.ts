import { VehicleTypeEntity } from "src/core/domain/entities/vehicleType.entity";
import { PrismaService } from "src/core/infrastructure/database/prisma.service";
import { IGenericRepository } from "../igeneric-repository";

export class VehicleTypePrismaRepository extends IGenericRepository<VehicleTypeEntity> {
  
  async getFirstByParameters(...parameters: any[]): Promise<VehicleTypeEntity> {
    return await this.prisma.vehicleType.findFirst({ 
      where: {
          AND: parameters
      } 
    });
  }

  async getAllByParameters(...parameters: any[]): Promise<VehicleTypeEntity[]> {
    return await this.prisma.vehicleType.findMany({ 
      where: {
          AND: parameters
      } 
    });
  }

    constructor(private readonly prisma: PrismaService) {
        super()
      }
    
      async create(data: VehicleTypeEntity): Promise<VehicleTypeEntity> {
        return await this.prisma.vehicleType.create({ 
            data 
        })
      }
    
      async update(id: number, data: VehicleTypeEntity): Promise<VehicleTypeEntity> {
        return await this.prisma.vehicleType.update({
          where: { id },
          data
        })
      }
      
      async getById(id: number): Promise<VehicleTypeEntity> {
        return await this.prisma.vehicleType.findUnique({ 
            where: { 
                id 
            } 
        })
        
      }
    
      async getAll(): Promise<VehicleTypeEntity[]> {
        return await this.prisma.vehicleType.findMany()
      }

      async getPagination(page: number = 1, pageSize: number = 10): Promise<{ data: VehicleTypeEntity[], total: number, lastPage: number, currentPage: number, perPage: number, prev: number | null, next: number | null }> {
        const offset = (page - 1) * pageSize;
    
        return 
      }


      async delete(id: number): Promise<number> {
        await this.prisma.vehicleType.delete({ 
            where: { 
                id 
            } 
        });
        return id;
      }

      
      
}