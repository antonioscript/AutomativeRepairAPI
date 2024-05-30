import { CreateVehicleTypeHandler } from "../use-cases/vehicleType/commands/create-vehicleType.command";
import { DeleteVehicleTypeHandler } from "../use-cases/vehicleType/commands/delete-vehicleType.use-command";
import { UpdateVehicleTypeHandler } from "../use-cases/vehicleType/commands/update-vehicleType.use-command";
import { GetAllVehicleTypesHandler } from "../use-cases/vehicleType/queries/get-all-vehicleTypes.query";
import { GetOneVehicleTypeHandler } from "../use-cases/vehicleType/queries/get-one-vehicleType.query";


export const QueryVehicleTypeHandlers = [GetAllVehicleTypesHandler, GetOneVehicleTypeHandler ];
export const CommandVehicleTypeHandlers = [CreateVehicleTypeHandler, UpdateVehicleTypeHandler, DeleteVehicleTypeHandler];
