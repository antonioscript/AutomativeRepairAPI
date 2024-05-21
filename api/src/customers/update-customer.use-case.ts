import { RequestCustomerDto } from './dto/request-customer.dto';
import { ResponseCustomerDto } from './dto/response-customer.dto';
import { UseCase } from 'src/base/use-case';
import { ResponseCustomerMapper } from 'src/base/response-customer.mapper';
import { CustomerRepository } from 'src/base/customer.repository';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UpdateCustomerMapper } from 'src/base/update-customer.mapper';


export class UpdateCustomerUseCase implements UseCase<ResponseCustomerDto> {
  private updateCustomerMapper: UpdateCustomerMapper
  private responseCustomerMapper: ResponseCustomerMapper

  constructor(private readonly repository: CustomerRepository) {
    this.updateCustomerMapper = new UpdateCustomerMapper()
    this.responseCustomerMapper = new ResponseCustomerMapper()
  }

  public async execute(id: number, customer: UpdateCustomerDto): Promise<ResponseCustomerDto> {
    const entity = this.updateCustomerMapper.mapFrom(customer)
    const responseCustomer = await this.repository.update(id, entity)
    return this.responseCustomerMapper.mapTo(responseCustomer)
  }
}
