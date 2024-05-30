import { CreateVehicleHandler } from "../use-cases/vehicle/commands/create-vehicle.command";
import { DeleteVehicleHandler } from "../use-cases/vehicle/commands/delete-vehicle.command";
import { UpdateVehicleHandler } from "../use-cases/vehicle/commands/update-vehicle.command";
import { GetAllVehiclesHandler } from "../use-cases/vehicle/queries/get-all-vehicles.query";
import { GetOneVehicleHandler } from "../use-cases/vehicle/queries/get-one-vehicle.query";


export const QueryVehicleHandlers = [GetAllVehiclesHandler, GetOneVehicleHandler ];
export const CommandVehicleHandlers = [CreateVehicleHandler, UpdateVehicleHandler, DeleteVehicleHandler];
