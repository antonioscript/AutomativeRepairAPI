import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";

@Injectable()
export class AuthService{
    constructor(private readonly jwtService: JwtService) {}
    
    createToken(user:User) {
        return this.jwtService.sign({
            id: user.id,
            name: user.name, 
            email: user.email
        }, {
            expiresIn: "7 days",
            subject: String(user.id),
            issuer: 'login',
            audience: 'users'
        });
    }

    checkToken(token: string){
        try {
            const data =  this.jwtService.verify(token, {
                audience: 'users',
                issuer: 'login'
            });

            return data;

        } catch (ex) {
            throw new BadRequestException(ex);
        }
    }

    isValidToken(token: string) {
        try {
            this.checkToken(token);
            return true;

        } catch (ex) {
            return false;
        }
        
    }
}