import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RequestVehicleDto } from "src/core/application/dtos/vehicle/request-vehicle.dto";
import { ResponseVehicleDto } from "src/core/application/dtos/vehicle/response-vehicle.dto";
import { RequestVehicleMapper } from "src/core/domain/mapping/vehicle/request-vehicle.mapper";
import { ResponseVehicleMapper } from "src/core/domain/mapping/vehicle/response-vehicle.mapper";
import { VehicleRepository } from "src/core/infrastructure/Repositories/vehicle/vehicle.repository";
import { messages } from "src/core/infrastructure/Shared/messages";
import { Result, result } from "src/core/infrastructure/Shared/result.util";


export class CreateVehicleCommand {
  constructor(public readonly request: RequestVehicleDto) {}
}

@CommandHandler(CreateVehicleCommand)
export class CreateVehicleHandler implements ICommandHandler<CreateVehicleCommand, Result<ResponseVehicleDto>> {
  private requestMapper: RequestVehicleMapper
  private responseMapper: ResponseVehicleMapper

  constructor(private readonly repository: VehicleRepository) {
    this.requestMapper = new RequestVehicleMapper()
    this.responseMapper = new ResponseVehicleMapper()
  }

  async execute(command: CreateVehicleCommand): Promise<Result<ResponseVehicleDto>> {

    const registerExists = await this.repository.getFirstByParameters({
      plate: command.request.plate
    });

    if (registerExists)
      throw new BadRequestException(messages.VEHICLE_ALREADY_EXISTS(command.request.plate));

    const entity = this.requestMapper.mapFrom(command.request);
    const responseEntity = await this.repository.create(entity);
    const responseData = this.responseMapper.mapTo(responseEntity);
    
    return result(responseData).Success();
  }
}