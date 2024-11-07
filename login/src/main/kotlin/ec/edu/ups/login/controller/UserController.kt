package ec.edu.ups.login.controller

import ec.edu.ups.login.dto.UserDto
import ec.edu.ups.login.service.IUserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(origins = ["*"])
@RequestMapping(value = ["/user"])
class UserController {
    @Autowired
    private lateinit var userService: IUserService

    @PostMapping
    fun save(@RequestBody userDto: UserDto): ResponseEntity<Any> {
        return try {
             ResponseEntity(userService.save(userDto), HttpStatus.OK)
        } catch (ex: Exception) {
            ResponseEntity(ex.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @PatchMapping
    fun update(@RequestBody userDto: UserDto): ResponseEntity<Any> {
        return try {
            userService.update(userDto)
             ResponseEntity(HttpStatus.OK)
        } catch (ex: Exception) {
            ResponseEntity(ex.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @PostMapping(value = ["/login"])
    fun login(@RequestBody userDto: UserDto): ResponseEntity<Any> {
        return try {
            ResponseEntity(userService.login(userDto), HttpStatus.OK)
        } catch (ex: Exception) {
            ResponseEntity(ex.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    @GetMapping
    fun getAll(): ResponseEntity<Any> {
        return try {
            ResponseEntity(userService.getAll(), HttpStatus.OK)
        } catch (ex: Exception) {
            ResponseEntity(ex.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }
}
