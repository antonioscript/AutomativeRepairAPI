import { ResponseCustomerDto } from './dto/response-customer.dto';
import { UseCase } from 'src/base/use-case';
import { ResponseCustomerMapper } from 'src/base/response-customer.mapper';
import { CustomerRepository } from 'src/base/customer.repository';


export class GetOneCustomerUseCase implements UseCase<ResponseCustomerDto> {
  private responseCustomerMapper: ResponseCustomerMapper

  constructor(private readonly repository: CustomerRepository) {
    this.responseCustomerMapper = new ResponseCustomerMapper()
  }

  public async execute(id: number): Promise<ResponseCustomerDto> {
    const register = await this.repository.getById(id);
    return this.responseCustomerMapper.mapTo(register);
  }
}
