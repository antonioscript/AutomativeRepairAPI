import { BadRequestException, Injectable } from "@nestjs/common";
import { InspectionOnServiceRepository } from "src/core/infrastructure/Repositories/inpectionOnService/inspectionOnService.repository";
import { PartRepository } from "src/core/infrastructure/Repositories/part/part.repository";
import { ServiceOnPartRepository } from "src/core/infrastructure/Repositories/serviceOnPart/serviceOnPart.repository";
import { messages } from "src/core/infrastructure/Shared/messages";

@Injectable()
export class ServiceOrderRules {
    constructor (
        private readonly inspectionOnServiceRepository: InspectionOnServiceRepository,
        private readonly serviceOnPartRepository: ServiceOnPartRepository,
        private readonly partRepository: PartRepository 
    ) {}

    public async checkAvailableParts(inspectionId: number) {
        const arrayServices = await this.inspectionOnServiceRepository.getAllByParameters({
            inspectionId: inspectionId
        });

        for (const serviceId of arrayServices.map(s => s.serviceId)) {
            const partArray = await this.serviceOnPartRepository.getAllByParameters({
              serviceId: serviceId
          });
    
            for (const partId of partArray.map(p => p.partId)) {
              const partQuantity = (await this.partRepository.getById(partId)).quantity;
              
              if (partQuantity < 1)
                throw new BadRequestException(messages.SERVICE_ORDER_NOT_CREATE(partId));
            }
          }   
    }

}