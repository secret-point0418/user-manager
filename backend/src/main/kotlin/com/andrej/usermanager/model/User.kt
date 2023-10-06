package com.andrej.usermanager.model

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
@Document(collection = "users")
data class User(
    val id: String? = null,

    @field:NotEmpty(message = "Name cannot be empty")
    val name: String,

    @field:NotEmpty(message = "Email cannot be empty")
    @field:Email(message = "Email should be valid")
    val email: String,

    @field:NotNull(message = "Phone number cannot be null")
    @field:Size(min = 10, max = 10, message = "Phone number should be 10 digits")
    val phoneNumber: String,

    var age: Int? = null
)