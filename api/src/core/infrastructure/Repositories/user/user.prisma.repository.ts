import { UserEntity } from "src/core/domain/entities/user.entity";
import { IGenericRepository } from "../igeneric-repository";
import { PrismaService } from "../../database/prisma.service";
import { UnauthorizedException } from "@nestjs/common";


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

      async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
          where: {
            email,
            password
          },
        });
    
        if (!user) {
          throw new UnauthorizedException("Usuário não autorizado");
        }

        return user;
      }

      async forget(email: string) {
        const user = await this.prisma.user.findFirst({
          where: {
            email
          },
        });
    
        

        return user;
      }

      async reset(password: string, token: string) {
        
        //TODO: Validar o Token
        
        const id = 0;

        await this.prisma.user.update({
          where: {
            id, 
          },
          data : {
            password,
          }
        });

        return true;

      }
}