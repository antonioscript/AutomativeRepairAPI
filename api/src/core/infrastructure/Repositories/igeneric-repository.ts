import { BaseEntity } from "src/core/domain/entities/base.entity";

export abstract class IGenericRepository<T extends BaseEntity> {

    abstract getAll(): Promise<T[]>;
    abstract getById(id: number): Promise<T>;
    abstract create(data: T): Promise<T>;
    abstract update(id: number, data: T): Promise<T>
    abstract delete(id: number): Promise<number>

    abstract getFirstByParameters(...parameters: any[]): Promise<T | null>
    abstract getAllByParameters(...parameters: any[]): Promise<T[]>
}