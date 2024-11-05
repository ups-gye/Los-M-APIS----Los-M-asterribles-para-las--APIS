package ec.edu.ups.login.service.impl

import ec.edu.ups.login.dto.UserDto
import ec.edu.ups.login.mapper.UserMapper
import ec.edu.ups.login.repository.UserRepository
import ec.edu.ups.login.service.IUserService
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.security.MessageDigest
import java.util.*

@Service
class UserServiceImpl: IUserService {
    private val log = LoggerFactory.getLogger(UserServiceImpl::class.toString())

    @Autowired
    private lateinit var userRepository: UserRepository


    override fun save(userDto: UserDto): UserDto {
        log.info("UserServiceImpl::save - INIT - userDto: [{}]", userDto)
        return try {
            val userName = userDto.userName.uppercase()
            userRepository.findUserEntityByUserName(userName).ifPresent {
                throw Exception("User [${userName}] already exist")
            }
            val entity = UserMapper.buildEntityFromDto(userDto)
            entity.userName = userName
            entity.userPassword = userDto.userPassword.md5()
            val response = userRepository.save(entity)
            UserMapper.buildDtoFromEntity(response)
        } catch (ex: Exception) {
            log.error("UserServiceImpl::save - ERROR - error: [{}]", ex.message)
            throw Exception("Error to save user - ERROR [${ex.message}]")
        }
    }

    override fun update(userDto: UserDto) {
        log.info("UserServiceImpl::update - INIT - userDto: [{}]", userDto)
        try {
            val current = userRepository.findById(userDto.id).orElseThrow {
                throw Exception("Id User [${userDto.id}] is not found")
            }
            current.userPassword = userDto.userPassword.md5()
            userRepository.save(current)
        } catch (ex: Exception) {
            log.error("UserServiceImpl::update - ERROR - error: [{}]", ex.message)
            throw Exception("Error to update user - ERROR [${ex.message}]")
        }
    }

    override fun login(userDto: UserDto): UserDto {
        log.info("UserServiceImpl::login - INIT - userDto: [{}]", userDto)
        return try {
            val userName = userDto.userName.uppercase()
            val current = userRepository.findUserEntityByUserName(userName).orElseThrow {
                throw Exception("Incorrect User: [${userName}]")
            }
            if (current.userPassword != userDto.userPassword.md5()) {
                throw Exception("Incorrect Password")
            }
            current.userPassword = "*****************"
            UserMapper.buildDtoFromEntity(current)
        } catch (ex: Exception) {
            log.error("UserServiceImpl::login - ERROR - error: [{}]", ex.message)
            throw Exception("Error to Authenticate User - ERROR [${ex.message}]")
        }
    }

    override fun getAll(): List<UserDto> {
        log.info("UserServiceImpl::getAll - INIT")
        try {

            val response = ArrayList<UserDto>()
            userRepository.findAll().forEach {
                response.add(UserMapper.buildDtoFromEntity(it))
            }
            return response
        } catch (ex: Exception) {
            log.error("UserServiceImpl::getAll - ERROR - error: [{}]", ex.message)
            throw Exception("Error to get all user")
        }
    }

    @OptIn(ExperimentalStdlibApi::class)
    fun String.md5(): String {
        val md = MessageDigest.getInstance("MD5")
        val digest = md.digest(this.toByteArray())
        return digest.toHexString()
    }
}
