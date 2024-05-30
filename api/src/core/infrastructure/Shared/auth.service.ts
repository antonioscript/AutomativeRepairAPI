import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";

@Injectable()
export class AuthService{
    constructor(private readonly jwtService: JwtService) {}
    
    async createToken(user:User) {
        return this.jwtService.sign({
            id: user.id,
            name: user.name, 
            email: user.email
        }, {
            expiresIn: "7 days",
            subject: String(user.id),
            issuer: 'login'
        });
    }

    async checkToken(){

    }
}