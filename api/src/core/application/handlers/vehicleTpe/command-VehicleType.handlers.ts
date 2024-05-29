import { CreateVehicleTypeHandler } from "../../use-cases/vehicleType/commands/create-vehicleType.command";
import { DeleteVehicleTypeHandler } from "../../use-cases/vehicleType/commands/delete-vehicleType.use-command";
import { UpdateVehicleTypeHandler } from "../../use-cases/vehicleType/commands/update-vehicleType.use-command";

export const CommandVehicleTypeHandlers = [CreateVehicleTypeHandler, DeleteVehicleTypeHandler, UpdateVehicleTypeHandler];
