package com.andrej.usermanager.repository

import com.andrej.usermanager.model.User
import org.springframework.data.mongodb.repository.MongoRepository

interface UserRepository : MongoRepository<User, String> {
    fun existsByEmail(email: String): Boolean
    fun findByNameOrEmailOrPhoneNumberOrAge(name: String?, email: String?, phoneNumber: String?, age: Int?): List<User>
}