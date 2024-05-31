import { AuthorizationHandler } from "../use-cases/user/commands/authorization.user.command";
import { DeleteUserHandler } from "../use-cases/user/commands/delete-user.command";
import { ForgetPasswordHandler } from "../use-cases/user/commands/forget.user.command";
import { LoginHandler } from "../use-cases/user/commands/login.user.command";
import { RegisterUserHandler } from "../use-cases/user/commands/register-user.command";
import { UpdateUserHandler } from "../use-cases/user/commands/update-user.command";
import { GetAllUsersHandler } from "../use-cases/user/queries/get-all-users.query";
import { GetOneUserHandler } from "../use-cases/user/queries/get-one-user.query";


export const CommandUserHandlers = [RegisterUserHandler, UpdateUserHandler, DeleteUserHandler, ForgetPasswordHandler, LoginHandler, AuthorizationHandler];
export const QueryUserHandlers = [GetAllUsersHandler, GetOneUserHandler];
