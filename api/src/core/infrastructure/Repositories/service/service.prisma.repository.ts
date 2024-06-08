import { PrismaService } from "src/core/infrastructure/database/prisma.service";
import { IGenericRepository } from "../igeneric-repository";
import { ServiceEntity } from "src/core/domain/entities/service.entity";
import { ResponseServiceDto } from "src/core/application/dtos/service/response-service.dto";
import { RequestServiceDto } from "src/core/application/dtos/service/request-service.dto";


export class ServicePrismaRepository extends IGenericRepository<ResponseServiceDto> {
  
  async getFirstByParameters(...parameters: any[]): Promise<ResponseServiceDto> {
    return await this.prisma.service.findFirst({ 
      where: {
          AND: parameters
      },
      include: {
        parts: true
      }
    });
  }

  async getAllByParameters(...parameters: any[]): Promise<ResponseServiceDto[]> {
    return await this.prisma.service.findMany({ 
      where: {
          AND: parameters
      },
      include: {
        parts: true
      }
    });
  }

    constructor(private readonly prisma: PrismaService) {
        super()
      }
    
      async create(data: RequestServiceDto): Promise<ResponseServiceDto> {
        return await this.prisma.service.create({ 
          data: {
            name: data.name,
            value: data.value,
            parts: {
              create: data.parts?.map(part => ({
                part: {
                  connect: {id: part.partId}
                }
              })) || [],
            }
          },
          include: {
            parts: {
              include: {
                part: true
              }
            }
          } 
        })
      }
    
      async update(id: number, data: RequestServiceDto): Promise<ResponseServiceDto> {
        return await this.prisma.service.update({
          where: { id },
          data: {
            name: data.name,
            value: data.value,
            parts: {
              create: data.parts?.map(part => ({
                part: {
                  connect: {id: part.id}
                }
              })) || [],
            }
          },
          include: {
            parts: {
              include: {
                part: true
              }
            }
          } 
        })
      }
      
      async getById(id: number): Promise<ResponseServiceDto> {
        return await this.prisma.service.findUnique({ 
            where: { 
                id 
            },
            include: {
              parts: {
                include: {
                  part: true
                }
              }
            } 
        })
        
      }
    
      async getAll(): Promise<ResponseServiceDto[]> {
        return await this.prisma.service.findMany({
          include: {
            parts: {
              include: {
                part: true
              }
            }
          }
        })
      }

      async getPaginated(page: number = 1, pageSize: number = 10): Promise<{ data: RequestServiceDto[], total: number, lastPage: number, currentPage: number, perPage: number, prev: number | null, next: number | null }> {
        const offset = (page - 1) * pageSize;
    
        const [data, total] = await Promise.all([
          this.prisma.service.findMany({
            take: pageSize,
            skip: offset,
            include: {
              parts: {
                include: {
                  part: true
                }
              }
            }
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