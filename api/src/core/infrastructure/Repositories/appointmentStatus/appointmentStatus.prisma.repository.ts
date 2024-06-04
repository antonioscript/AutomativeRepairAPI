import { PrismaService } from "src/core/infrastructure/database/prisma.service";
import { IGenericRepository } from "../igeneric-repository";
import { AppointmentStatusEntity } from "src/core/domain/entities/appointmentStatus.entity";


export class AppointmentStatusPrismaRepository extends IGenericRepository<AppointmentStatusEntity> {
  
  async getFirstByParameters(...parameters: any[]): Promise<AppointmentStatusEntity> {
    return await this.prisma.appointmentStatus.findFirst({ 
      where: {
          AND: parameters
      } 
    });
  }

  async getAllByParameters(...parameters: any[]): Promise<AppointmentStatusEntity[]> {
    return await this.prisma.appointmentStatus.findMany({ 
      where: {
          AND: parameters
      } 
    });
  }

    constructor(private readonly prisma: PrismaService) {
        super()
      }
    
      async create(data: AppointmentStatusEntity): Promise<AppointmentStatusEntity> {
        return await this.prisma.appointmentStatus.create({ 
            data 
        })
      }
    
      async update(id: number, data: AppointmentStatusEntity): Promise<AppointmentStatusEntity> {
        return await this.prisma.appointmentStatus.update({
          where: { id },
          data
        })
      }
      
      async getById(id: number): Promise<AppointmentStatusEntity> {
        return await this.prisma.appointmentStatus.findUnique({ 
            where: { 
                id 
            } 
        })
        
      }
    
      async getAll(): Promise<AppointmentStatusEntity[]> {
        return await this.prisma.appointmentStatus.findMany()
      }

      async getPaginated(page: number = 1, pageSize: number = 10): Promise<{ data: AppointmentStatusEntity[], total: number, lastPage: number, currentPage: number, perPage: number, prev: number | null, next: number | null }> {
        const offset = (page - 1) * pageSize;
    
        const [data, total] = await Promise.all([
          this.prisma.appointmentStatus.findMany({
            take: pageSize,
            skip: offset
          }),
          this.prisma.appointmentStatus.count()
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
        await this.prisma.appointmentStatus.delete({ 
            where: { 
                id 
            } 
        });
        return id;
      }
}