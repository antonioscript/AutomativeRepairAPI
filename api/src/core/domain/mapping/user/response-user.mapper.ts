import { ResponseUserDto } from "src/core/application/dtos/user/response-user.dto"
import { UserEntity } from "../../entities/user.entity"
import { Mapper } from "../mapper"



export class ResponseUserMapper extends Mapper<ResponseUserDto, UserEntity> {
  public mapFrom(data: ResponseUserDto): UserEntity {
    const user = new UserEntity()

    user.id = data.id 
    user.name = data.name
    user.email = data.email

    return user
  }

  public mapTo(data: UserEntity): ResponseUserDto {
    const user = new ResponseUserDto()

    user.id = data.id
    user.name = data.name
    user.email = data.email
    
    return user
  }
}
