package com.raja.portfolio.backend.service;

import com.raja.portfolio.backend.dto.ContactRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private static final Logger logger = LoggerFactory.getLogger(ContactService.class);

    private final JavaMailSender mailSender;

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public ContactService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactEmail(ContactRequest request) {
        logger.info("Preparing to send inquiry email from {} <{}>: {}", request.name(), request.email(), request.subject());

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(adminEmail);
        
        // Use the configured SMTP username as from email, or fallback
        mailMessage.setFrom(fromEmail != null && !fromEmail.isEmpty() ? fromEmail : "noreply@portfolio.com");
        
        // Add Reply-To so that admins can directly respond to the inquirer
        mailMessage.setReplyTo(request.email());
        
        mailMessage.setSubject("[Portfolio Inquiry] " + request.subject());

        String body = String.format(
            "Hi Raja,\n\n" +
            "You have received a new contact submission on your developer portfolio:\n\n" +
            "------------------------------------------\n" +
            "Name:    %s\n" +
            "Email:   %s\n" +
            "Subject: %s\n" +
            "------------------------------------------\n\n" +
            "Message:\n%s\n\n" +
            "Regards,\n" +
            "Portfolio Mailer Bot",
            request.name(),
            request.email(),
            request.subject(),
            request.message()
        );

        mailMessage.setText(body);

        try {
            mailSender.send(mailMessage);
            logger.info("Email successfully dispatched to {}", adminEmail);
        } catch (Exception e) {
            logger.error("Failed to send contact email to {}: {}", adminEmail, e.getMessage(), e);
            throw new RuntimeException("SMTP Server failure: Unable to transmit notification. Please try again later.", e);
        }
    }
}
