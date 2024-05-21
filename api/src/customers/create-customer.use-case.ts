import { RequestCustomerDto } from './dto/request-customer.dto';
import { ResponseCustomerDto } from './dto/response-customer.dto';
import { UseCase } from 'src/base/use-case';
import { ResponseCustomerMapper } from 'src/base/response-customer.mapper';
import { CustomerRepository } from 'src/base/customer.repository';
import { RequestCustomerMapper } from 'src/base/request-customer.mapper';


export class CreateCustomerUseCase implements UseCase<ResponseCustomerDto> {
  private requestCustomerMapper: RequestCustomerMapper
  private responseCustomerMapper: ResponseCustomerMapper

  constructor(private readonly repository: CustomerRepository) {
    this.requestCustomerMapper = new RequestCustomerMapper()
    this.responseCustomerMapper = new ResponseCustomerMapper()
  }

  public async execute(customer: RequestCustomerDto): Promise<ResponseCustomerDto> {
    const entity = this. requestCustomerMapper.mapFrom(customer)
    const responseCustomer = await this.repository.create(entity)
    return this.responseCustomerMapper.mapTo(responseCustomer)
  }
}
