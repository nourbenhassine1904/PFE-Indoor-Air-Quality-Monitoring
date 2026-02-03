package net.ai.webabackend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;
import net.ai.webabackend.dto.ContactRequest;

@RestController
@RequestMapping("/api/v1/contact")
@RequiredArgsConstructor
public class ContactController {
    @PostMapping("")
    public  ResponseEntity<String> submitContactForm( @RequestBody ContactRequest request) {
        // Traitement du formulaire ici
        System.out.println("Nom : " + request.getName());
        System.out.println("Email : " +request.getEmail());
        System.out.println("Message : " + request.getMessage());

        // Redirection vers une page de confirmation
    
        return ResponseEntity.ok("contact-success");
	}

}
