package com.andrej.usermanager.controller

import com.andrej.usermanager.exception.UserAlreadyExistsException
import com.andrej.usermanager.exception.UserNotFoundException
import org.springframework.web.bind.annotation.*
import com.andrej.usermanager.service.UserService
import com.andrej.usermanager.model.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity

@RestController
@RequestMapping("/user")
class UserController(@Autowired val userService: UserService) {

    @CrossOrigin(origins = ["http://localhost:3000"])
    @GetMapping("/all")
    fun getAllUsers(): ResponseEntity<List<User>> {
        val users = userService.getAllUsers()
        return ResponseEntity.ok(users)
    }

    @CrossOrigin(origins = ["http://localhost:3000"])
    @PostMapping
    fun createUser(@RequestBody user: User): ResponseEntity<Any> {
        return try {
            userService.createUser(user)
            ResponseEntity.status(HttpStatus.CREATED).body("User was successfully created")
        } catch (ex: UserAlreadyExistsException) {
            ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.message)
        }
    }

    @CrossOrigin(origins = ["http://localhost:3000"])
    @GetMapping("/{id}")
    fun getUser(@PathVariable id: String): ResponseEntity<Any> {
        return try {
            val user = userService.getUserById(id)
            ResponseEntity.ok(user)
        } catch (ex: UserNotFoundException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.message)
        }
    }

    @CrossOrigin(origins = ["http://localhost:3000"])
    @PutMapping("/{id}")
    fun updateUser(@PathVariable id: String, @RequestBody user: User): ResponseEntity<Any> {
        return try {
            userService.updateUser(id, user)
            ResponseEntity.status(HttpStatus.OK).body("User info was successfully updated")
        } catch (ex: UserNotFoundException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.message)
        }
    }

    @CrossOrigin(origins = ["http://localhost:3000"])
    @DeleteMapping("/{id}")
    fun deleteUser(@PathVariable id: String): ResponseEntity<Any> {
        return try {
            userService.deleteUser(id)
            ResponseEntity.ok("User was successfully deleted")
        } catch (ex: UserNotFoundException) {
            ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.message)
        }
    }
}