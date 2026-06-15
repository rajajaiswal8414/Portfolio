package com.raja.portfolio.backend.controller;

import com.raja.portfolio.backend.dto.ContactRequest;
import com.raja.portfolio.backend.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "${cors.allowed-origins:http://localhost:5173}")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> handleContactSubmission(@Valid @RequestBody ContactRequest request) {
        contactService.sendContactEmail(request);
        return ResponseEntity.ok(Map.of(
            "status", "success",
            "message", "Message sent successfully! Thank you for reaching out."
        ));
    }
}
