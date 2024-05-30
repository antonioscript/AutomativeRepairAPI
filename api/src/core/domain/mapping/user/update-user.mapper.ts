import { Mapper } from "../mapper"
import { UpdateUserDto } from "src/core/application/dtos/user/update-user.dto"
import { UserEntity } from "src/core/domain/entities/user.entity"

export class UpdateUserMapper extends Mapper<UpdateUserDto, UserEntity> {
  public mapFrom(data: UpdateUserDto): UserEntity {
    const user = new UserEntity()

    user.id = data.id 
    user.name = data.name
    user.email = data.email

    return user
  }

  public mapTo(data: UserEntity): UpdateUserDto {
    const user = new UpdateUserDto()

    user.id = data.id 
    user.name = data.name
    user.email = data.email

    return user
  }
}
