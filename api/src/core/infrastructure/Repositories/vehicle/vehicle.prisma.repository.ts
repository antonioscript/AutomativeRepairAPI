import { VehicleEntity } from "src/core/domain/entities/vehicle.entity";
import { IGenericRepository } from "../igeneric-repository";
import { PrismaService } from "../../database/prisma.service";
import { RequestVehicleDto } from "src/core/application/dtos/vehicle/request-vehicle.dto";
import { UpdateVehicleDto } from "src/core/application/dtos/vehicle/update-vehicle.dto";


export class VehiclePrismaRepository extends IGenericRepository<VehicleEntity> {
  
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async getFirstByParameters(...parameters: any[]): Promise<VehicleEntity> {
    return await this.prisma.vehicle.findFirst({ 
      where: {
          AND: parameters
      },
      include: {
          customer: true
      }
    });
  }

  async getAllByParameters(...parameters: any[]): Promise<VehicleEntity[]> {
    return await this.prisma.vehicle.findMany({ 
      where: {
          AND: parameters
      },
      include: {
          customer: true
      }
    });
  }
    
      async create(data: RequestVehicleDto): Promise<VehicleEntity> {
        return await this.prisma.vehicle.create({ 
            data,
            include: {
                customer: true
            }
        }) 
      }
    
      async update(id: number, data: UpdateVehicleDto): Promise<VehicleEntity> {
        return await this.prisma.vehicle.update({
          where: { id },
          data,
          include: {
              customer: true
          }
        })
      }
      
      async getById(id: number): Promise<VehicleEntity> {
        return await this.prisma.vehicle.findUnique({ 
            where: { 
                id 
            },
            include: {
                customer: true
            }
        })
        
      }
    
      async getAll(): Promise<VehicleEntity[]> {
        return await this.prisma.vehicle.findMany({
            include: {
                customer: true
            }
        });
    }

    async getPaginated(page: number = 1, pageSize: number = 10): Promise<{ data: VehicleEntity[], total: number, lastPage: number, currentPage: number, perPage: number, prev: number | null, next: number | null }> {
      const offset = (page - 1) * pageSize;
  
      return 
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