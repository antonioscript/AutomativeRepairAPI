import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { UserRepository } from "../../Repositories/user/user.repository";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly userRepository: UserRepository
    ) {}

    async canActivate(context: ExecutionContext){
        
        const request = context.switchToHttp().getRequest();
        const {authorization} = request.headers;

        
        try {
            const data =  this.authService.checkToken((authorization ?? '').split(' ')[1]);
            
            request.user = await this.userRepository.getById(data.id);

            request.tokenPayload = data;

            return true;

        } catch (ex) {
            return false;
        }
        
    }

}