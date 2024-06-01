import { ApiQuery } from "@nestjs/swagger";

export function ApiPaginatedQuery() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      ApiQuery({ name: 'page', required: false, type: Number })(target, propertyKey, descriptor);
      ApiQuery({ name: 'pageSize', required: false, type: Number })(target, propertyKey, descriptor);
    };
  }