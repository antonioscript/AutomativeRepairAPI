import { RequestCustomerDto } from './dto/request-customer.dto';
import { ResponseCustomerDto } from './dto/response-customer.dto';
import { UseCase } from 'src/base/use-case';
import { ResponseCustomerMapper } from 'src/base/response-customer.mapper';
import { CustomerRepository } from 'src/base/customer.repository';


export class GetAllCustomersUseCase implements UseCase<ResponseCustomerDto[]> {
  private responseCustomerMapper: ResponseCustomerMapper

  constructor(private readonly repository: CustomerRepository) {
    this.responseCustomerMapper = new ResponseCustomerMapper()
  }

  public async execute(): Promise<ResponseCustomerDto[]> {
    const customers = await this.repository.getAll();
    return customers.map(customer => this.responseCustomerMapper.mapTo(customer))
  }
}
