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
    
            for (const partOnService of partArray) {
              const part = (await this.partRepository.getById(partOnService.id));
              
              if (part.quantity < 1) {
                throw new BadRequestException(messages.SERVICE_ORDER_NOT_CREATE(part.id));
              }
              else
              {
                part.quantity = part.quantity -1;

                //Update
                await this.partRepository.update(part.id, part);

              }
                
            }
          }   
    }

}