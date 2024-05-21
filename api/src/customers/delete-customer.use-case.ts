import { CustomerRepository } from 'src/base/customer.repository';


export class DeleteCustomerUseCase  {

  constructor(private readonly repository: CustomerRepository) {
  }

  public async execute(id: number) {
    await this.repository.delete(id);
  }
}
