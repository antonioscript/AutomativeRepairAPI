import { UserEntity } from "src/core/domain/entities/user.entity";
import { IGenericRepository } from "../igeneric-repository";
import { PrismaService } from "../../database/prisma.service";


export class UserPrismaRepository extends IGenericRepository<UserEntity> {
  
  async getFirstByParameters(...parameters: any[]): Promise<UserEntity> {
    return await this.prisma.user.findFirst({ 
      where: {
          AND: parameters
      } 
    });
  }

  async getAllByParameters(...parameters: any[]): Promise<UserEntity[]> {
    return await this.prisma.user.findMany({ 
      where: {
          AND: parameters
      } 
    });
  }

    constructor(private readonly prisma: PrismaService) {
        super()
      }
    
      async create(data: UserEntity): Promise<UserEntity> {
        return await this.prisma.user.create({ 
            data 
        })
      }
    
      async update(id: number, data: UserEntity): Promise<UserEntity> {
        return await this.prisma.user.update({
          where: { id },
          data
        })
      }
      
      async getById(id: number): Promise<UserEntity> {
        return await this.prisma.user.findUnique({ 
            where: { 
                id 
            } 
        })
        
      }
    
      async getAll(): Promise<UserEntity[]> {
        return await this.prisma.user.findMany()
      }

      async delete(id: number): Promise<number> {
        await this.prisma.user.delete({ 
            where: { 
                id 
            } 
        });
        return id;
      }

      
      
}