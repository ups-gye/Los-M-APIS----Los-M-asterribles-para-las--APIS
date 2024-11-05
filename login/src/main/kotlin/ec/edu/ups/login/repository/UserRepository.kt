package ec.edu.ups.login.repository

import ec.edu.ups.login.entity.UserEntity
import org.springframework.data.jpa.repository.JpaRepository
import java.util.Optional

interface UserRepository: JpaRepository<UserEntity, Short> {
    fun findUserEntityByUserName(userName: String): Optional<UserEntity>
}
