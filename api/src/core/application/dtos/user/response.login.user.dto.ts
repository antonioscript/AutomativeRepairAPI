import { ResponseUserDto } from "./response-user.dto";

export class UserLoginResponseDto {
    user: ResponseUserDto;
    token: string;
  
    constructor(user: ResponseUserDto, token: string) {
      this.user = user;
      this.token = token;
    }
  }
  