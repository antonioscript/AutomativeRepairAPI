import { CreateUserHandler } from "../use-cases/user/commands/create-user.command";
import { DeleteUserHandler } from "../use-cases/user/commands/delete-user.command";
import { UpdateUserHandler } from "../use-cases/user/commands/update-user.command";
import { GetAllUsersHandler } from "../use-cases/user/queries/get-all-users.query";
import { GetOneUserHandler } from "../use-cases/user/queries/get-one-user.query";


export const CommandUserHandlers = [CreateUserHandler, UpdateUserHandler, DeleteUserHandler];
export const QueryUserHandlers = [GetAllUsersHandler, GetOneUserHandler];
