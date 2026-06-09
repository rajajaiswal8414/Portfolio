package com.raja.portfolio.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactRequest(
    @NotBlank(message = "Name cannot be empty")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    String name,
    
    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Please enter a valid email address")
    String email,
    
    @NotBlank(message = "Subject cannot be empty")
    @Size(min = 3, max = 200, message = "Subject must be between 3 and 200 characters")
    String subject,
    
    @NotBlank(message = "Message cannot be empty")
    @Size(min = 10, max = 5000, message = "Message must be at least 10 characters")
    String message
) {}
