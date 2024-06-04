import { IGenericRepository } from "../igeneric-repository";
import { PrismaService } from "../../database/prisma.service";
import { AppointmentEntity } from "src/core/domain/entities/appointment.entity";
import { RequestAppointmentDto } from "src/core/application/dtos/appointment/request-appointment.dto";
import { UpdateAppointmentDto } from "src/core/application/dtos/appointment/update-appointment.dto";


export class AppointmentPrismaRepository extends IGenericRepository<AppointmentEntity> {
  
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async getFirstByParameters(...parameters: any[]): Promise<AppointmentEntity> {
    return await this.prisma.appointment.findFirst({ 
      where: {
          AND: parameters
      },
      include: {
          customer: true,
          status: true
      }
    });
  }

  async getAllByParameters(...parameters: any[]): Promise<AppointmentEntity[]> {
    return await this.prisma.appointment.findMany({ 
      where: {
          AND: parameters
      },
      include: {
          customer: true,
          status: true
      }
    });
  }
    
      async create(data: RequestAppointmentDto): Promise<AppointmentEntity> {
        return await this.prisma.appointment.create({ 
            data,
            include: {
                customer: true,
                status: true
            }
        }) 
      }
    
      async update(id: number, data: UpdateAppointmentDto): Promise<AppointmentEntity> {
        return await this.prisma.appointment.update({
          where: { id },
          data,
          include: {
              customer: true,
              status: true
          }
        })
      }
      
      async getById(id: number): Promise<AppointmentEntity> {
        return await this.prisma.appointment.findUnique({ 
            where: { 
                id 
            },
            include: {
                customer: true,
                status: true
            }
        })
        
      }
    
      async getAll(): Promise<AppointmentEntity[]> {
        return await this.prisma.appointment.findMany({
            include: {
                customer: true,
                status: true
            }
        });
    }

    async getPaginated(page: number = 1, pageSize: number = 10): Promise<{ data: AppointmentEntity[], total: number, lastPage: number, currentPage: number, perPage: number, prev: number | null, next: number | null }> {
      const offset = (page - 1) * pageSize;
  
      const [data, total] = await Promise.all([
        this.prisma.appointment.findMany({
          take: pageSize,
          skip: offset,
          include: {
            customer: true,
            status: true
          }
        }),
        this.prisma.appointment.count()
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
        await this.prisma.appointment.delete({ 
            where: { 
                id 
            } 
        });
        return id;
      }

      
      
}