import { PrismaService } from "src/core/infrastructure/database/prisma.service";
import { IGenericRepository } from "../igeneric-repository";
import { InspectionEntity } from "src/core/domain/entities/inspection.entity";
import { RequestInspectionDto } from "src/core/application/dtos/inspection/request-inspection.dto";
import { UpdateInspectionDto } from "src/core/application/dtos/inspection/update-inspection.dto";

export class InspectionPrismaRepository extends IGenericRepository<InspectionEntity> {
  
  async getFirstByParameters(...parameters: any[]): Promise<InspectionEntity> {
    return await this.prisma.inspection.findFirst({ 
      where: {
          AND: parameters
      },
      include: {
        services: true
      } 
    });
  }

  async getAllByParameters(...parameters: any[]): Promise<InspectionEntity[]> {
    return await this.prisma.inspection.findMany({ 
      where: {
          AND: parameters
      },
      include: {
        services: true
      }  
    });
  }

    constructor(private readonly prisma: PrismaService) {
        super()
      }
    
      async create(data: RequestInspectionDto): Promise<InspectionEntity> {
        return await this.prisma.inspection.create({ 
          data: {
            appointmentId: data.appointmentId,
            vehicleId: data.vehicleId,
            description: data.description,
            value: data.value,
            services: {
              create: data.services?.map(service => ({
                service: {
                  connect: { id: service.serviceId }
                }
              })) || [],
            }
          },
          include: {
            vehicle: true,
            services: {
              include: {
                service: {
                  include: {
                    parts: {
                      include: {
                        part: true
                      }
                    }
                  }
                }
              }
            }, 
          },
        });
      }
      
    
      async update(id: number, data: UpdateInspectionDto): Promise<InspectionEntity> {
        return await this.prisma.inspection.update({
          where: { id },
          data
        })
      }
      
      async getById(id: number): Promise<InspectionEntity> {
        return await this.prisma.inspection.findUnique({ 
            where: { 
                id 
            },
            include: {
              vehicle: true,
              services: {
                include: {
                  service: {
                    include: {
                      parts: {
                        include: {
                          part: true
                        }
                      }
                    }
                  }
                }
              }
            }  
        })
        
      }
    
      async getAll(): Promise<InspectionEntity[]> {
        return await this.prisma.inspection.findMany({
          include: {
            vehicle: true,
            services: {
              include: {
                service: {
                  include: {
                    parts: {
                      include: {
                        part: true
                      }
                    }
                  }
                }
              }
            }
          } 
        })
      }

      async getPaginated(page: number = 1, pageSize: number = 10): Promise<{ data: InspectionEntity[], total: number, lastPage: number, currentPage: number, perPage: number, prev: number | null, next: number | null }> {
        const offset = (page - 1) * pageSize;
    
        const [data, total] = await Promise.all([
          this.prisma.inspection.findMany({
            take: pageSize,
            skip: offset,
            include: {
              vehicle: true,
              services: {
                include: {
                  service: {
                    include: {
                      parts: true
                    }
                  }
                }
              }
            }   
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