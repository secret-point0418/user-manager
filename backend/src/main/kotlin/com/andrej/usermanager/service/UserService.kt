package com.andrej.usermanager.service

import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import com.andrej.usermanager.exception.UserAlreadyExistsException
import com.andrej.usermanager.exception.UserNotFoundException
import com.andrej.usermanager.repository.UserRepository
import com.andrej.usermanager.model.User

@Service
class UserService(private val userRepository: UserRepository) {

    fun getAllUsers(): List<User> {
        return userRepository.findAll()
    }

    fun createUser(user: User): User {
        if (userRepository.existsByEmail(user.email)) {
            throw UserAlreadyExistsException("User already exists")
        }
        val restTemplate = RestTemplate()
        val age = restTemplate.getForObject("https://api.agify.io?name=${user.name}", AgeResponse::class.java)?.age
        user.age = age
        return userRepository.save(user)
    }

    fun getUserById(id: String): User {
        return userRepository.findById(id).orElseThrow { UserNotFoundException("User was not found") }
    }

    fun updateUser(id: String, user: User): User {
        if (!userRepository.existsById(id)) {
            throw UserNotFoundException("User was not found")
        }
        return userRepository.save(user.copy(id = id))
    }

    fun deleteUser(id: String) {
        if (!userRepository.existsById(id)) {
            throw UserNotFoundException("User was not found")
        }
        userRepository.deleteById(id)
    }
}

data class AgeResponse(val age: Int)