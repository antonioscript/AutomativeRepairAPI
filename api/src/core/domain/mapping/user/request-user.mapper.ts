import { Mapper } from "../mapper"
import { UserEntity } from "../../entities/user.entity"
import { RequestUserDto } from "src/core/application/dtos/user/request-user.dto"

export class RequestUserMapper extends Mapper<RequestUserDto, UserEntity> {
  public mapFrom(data: RequestUserDto): UserEntity {
    const user = new UserEntity()

    user.name = data.name
    user.email = data.email
    user.password = data.password

    return user
  }

  public mapTo(data: UserEntity): RequestUserDto {
    const user = new RequestUserDto()

    //user.id = data.id
    user.name = data.email
    user.email = data.email
    user.password = data.password

    return user
  }
}
