package ec.edu.ups.login.service

import ec.edu.ups.login.dto.UserDto

interface IUserService {
    fun save(userDto: UserDto): UserDto

    fun update(userDto: UserDto)

    fun login(userDto: UserDto): UserDto

    fun getAll(): List<UserDto>
}
