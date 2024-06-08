import { ResponseServiceOnPartDto } from "src/core/application/dtos/serviceOnPart/response-serviceOnPart.dto";
import { PrismaService } from "../../database/prisma.service";
import { IGenericRepository } from "../igeneric-repository";
import { RequestServiceOnPartDto } from "src/core/application/dtos/serviceOnPart/request-serviceOnPart.dto";

export class ServiceOnPartPrismaRepository extends IGenericRepository<ResponseServiceOnPartDto> {
  
  
  constructor(private readonly prisma: PrismaService) {
    super()
  }
  async getFirstByParameters(...parameters: any[]): Promise<ResponseServiceOnPartDto> {
    return await this.prisma.serviceOnPart.findFirst({ 
      where: {
          AND: parameters
      }
    });
  }

  async getAllByParameters(...parameters: any[]): Promise<ResponseServiceOnPartDto[]> {
    return await this.prisma.serviceOnPart.findMany({ 
      where: {
          AND: parameters
      }
    });
  }

    
      async create(data: RequestServiceOnPartDto): Promise<ResponseServiceOnPartDto> {
        return await this.prisma.serviceOnPart.create({ 
            data
        })
      }
    
      async update(id: number, data: RequestServiceOnPartDto): Promise<ResponseServiceOnPartDto> {
        return await this.prisma.serviceOnPart.update({
          where: { id },
          data
        })
      }
      
      async getById(id: number): Promise<ResponseServiceOnPartDto> {
        return await this.prisma.serviceOnPart.findUnique({ 
            where: { 
                id 
            }
        })
        
      }
    
      async getAll(): Promise<ResponseServiceOnPartDto[]> {
        return await this.prisma.serviceOnPart.findMany()
      }

      
      getPaginated(page: number, pageSize: number): Promise<{ data: ResponseServiceOnPartDto[]; total: number; lastPage: number; currentPage: number; perPage: number; prev: number; next: number; }> {
        throw new Error("Method not implemented.");
      }

      async delete(id: number): Promise<number> {
        await this.prisma.serviceOnPart.delete({ 
            where: { 
                id 
            } 
        });
        return id;
      }
}