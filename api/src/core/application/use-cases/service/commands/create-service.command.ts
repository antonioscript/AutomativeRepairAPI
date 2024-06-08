
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs"
import { BadRequestException } from "@nestjs/common"
import { Result, result } from "src/core/infrastructure/Shared/result.util"
import { messages } from "src/core/infrastructure/Shared/messages"
import { RequestServiceDto } from "src/core/application/dtos/service/request-service.dto"
import { RequestServiceMapper } from "src/core/domain/mapping/services/request-service.mapper"
import { ResponseServiceDto } from "src/core/application/dtos/service/response-service.dto"
import { ServiceRepository } from "src/core/infrastructure/Repositories/service/service.repository"
import { ResponseServiceMapper } from "src/core/domain/mapping/services/response-service.mapper"
import { PartRepository } from "src/core/infrastructure/Repositories/part/part.repository"

export class CreateServiceCommand {
  constructor(public readonly request: RequestServiceDto) {}
}

@CommandHandler(CreateServiceCommand)
export class CreateServiceHandler implements ICommandHandler<CreateServiceCommand, Result<ResponseServiceDto>> {
  private requestMapper: RequestServiceMapper
  private responseMapper: ResponseServiceMapper

  constructor(private readonly repository: ServiceRepository, private readonly partRepository: PartRepository) {
    this.requestMapper = new RequestServiceMapper()
    this.responseMapper = new ResponseServiceMapper()
  }

  async execute(command: CreateServiceCommand): Promise<Result<ResponseServiceDto>> {

    const registerExists = await this.repository.getFirstByParameters({
      name: command.request.name
    });

    if (registerExists)
      throw new BadRequestException(messages.SERVICE_ALREADY_EXISTS(command.request.name));

    

    const arrayPartsId = command.request.parts?.map(p => p.partId);
    
    let totalValue = 0;
    for (const partId of arrayPartsId){
      const partValue = (await this.partRepository.getById(partId)).value;
      totalValue += partValue;
    }

    const entity = this.requestMapper.mapFrom(command.request);
    entity.value = totalValue;

    const responseEntity = await this.repository.create(entity);
    const responseData = this.responseMapper.mapTo(responseEntity);
    
    return result(responseData).Success();
  }
}