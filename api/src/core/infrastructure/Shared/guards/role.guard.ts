import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { UserRepository } from "../../Repositories/user/user.repository";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Role } from "../../enums/role.enum";


@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector    
    ) {}

    async canActivate(context: ExecutionContext){
        
        const requerideRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);

        if (!requerideRoles) {
            return true;
        }

        const {user} = context.switchToHttp().getRequest();

        const rolesFilted = requerideRoles.filter(role => role === user.role )

        return rolesFilted.length > 0;
    }
}