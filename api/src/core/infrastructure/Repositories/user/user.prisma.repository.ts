import { UserEntity } from "src/core/domain/entities/user.entity";
import { IGenericRepository } from "../igeneric-repository";
import { PrismaService } from "../../database/prisma.service";
import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { MESSAGES } from "@nestjs/core/constants";
import { messages } from "../../Shared/messages";

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
        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());

        return await this.prisma.user.create({ 
            data 
        })
      }
    
      async update(id: number, data: UserEntity): Promise<UserEntity> {

        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());        

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

      async getPaginated(page: number = 1, pageSize: number = 10): Promise<{ data: UserEntity[], total: number, lastPage: number, currentPage: number, perPage: number, prev: number | null, next: number | null }> {
        const offset = (page - 1) * pageSize;
    
        return 
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
            email
          },
        });
    
        if (!user) {
          throw new UnauthorizedException(messages.USER_UNAUTHORIZED);
        }

        if (!await bcrypt.compare(password, user.password)) {
          throw new UnauthorizedException(messages.USER_UNAUTHORIZED);
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