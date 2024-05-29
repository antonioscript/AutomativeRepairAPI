import { VehicleEntity } from "src/core/domain/entities/vehicle.entity";
import { IGenericRepository } from "../igeneric-repository";
import { PrismaService } from "../../database/prisma.service";


export class VehiclePrismaRepository extends IGenericRepository<VehicleEntity> {
  
  async getFirstByParameters(...parameters: any[]): Promise<VehicleEntity> {
    return await this.prisma.vehicle.findFirst({ 
      where: {
          AND: parameters
      } 
    });
  }

  async getAllByParameters(...parameters: any[]): Promise<VehicleEntity[]> {
    return await this.prisma.vehicle.findMany({ 
      where: {
          AND: parameters
      } 
    });
  }

    constructor(private readonly prisma: PrismaService) {
        super()
      }
    
      async create(data: VehicleEntity): Promise<VehicleEntity> {
        return await this.prisma.vehicle.create({ 
            data 
        })
      }
    
      async update(id: number, data: VehicleEntity): Promise<VehicleEntity> {
        return await this.prisma.vehicle.update({
          where: { id },
          data
        })
      }
      
      async getById(id: number): Promise<VehicleEntity> {
        return await this.prisma.vehicle.findUnique({ 
            where: { 
                id 
            } 
        })
        
      }
    
      async getAll(): Promise<VehicleEntity[]> {
        return await this.prisma.vehicle.findMany()
      }

      async delete(id: number): Promise<number> {
        await this.prisma.vehicle.delete({ 
            where: { 
                id 
            } 
        });
        return id;
      }

      
      
}