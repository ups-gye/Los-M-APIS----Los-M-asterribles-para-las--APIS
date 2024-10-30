package ec.edu.ups.login.mapper

import ec.edu.ups.login.dto.UserDto
import ec.edu.ups.login.entity.UserEntity

object UserMapper {
    fun buildDtoFromEntity(entity: UserEntity): UserDto =
        UserDto(
            id = entity.id,
            userName = entity.userName,
            userPassword = entity.userPassword
        )

    fun buildEntityFromDto(dto:UserDto): UserEntity =
        UserEntity(
            id = dto.id,
            userName = dto.userName,
            userPassword = dto.userPassword
        )
}
