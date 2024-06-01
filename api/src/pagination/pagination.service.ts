import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/infrastructure/database/prisma.service';

@Injectable()
export class PaginationService {
  constructor(private readonly prisma: PrismaService) {}

  async findPaginatedData(page: number = 1, pageSize: number = 10): Promise<any> {
    const offset = (page - 1) * pageSize;
    const [total, data] = await Promise.all([
      this.prisma.customer.count(),
      this.prisma.customer.findMany({
        take: pageSize,
        skip: offset,
        orderBy: {
          //TO DO
        },
      }),
    ]);
    const lastPage = Math.ceil(total / pageSize);
    const prev = page > 1 ? page - 1 : null;
    const next = page < lastPage ? page + 1 : null;

    return {
      data,
      pagination: {
        total,
        lastPage,
        currentPage: page,
        perPage: pageSize,
        prev,
        next,
      },
    };
  }

}
