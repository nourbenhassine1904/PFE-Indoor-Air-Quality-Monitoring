package net.ai.webabackend.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;
import net.ai.webabackend.Repository.UserRepository;
import net.ai.webabackend.dto.RegisterRequest;
import net.ai.webabackend.dto.UserDto;
import net.ai.webabackend.service.UserService;
import net.ai.webabackend.modal.Role;


@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserService userService;

    @GetMapping("/client")
    public ResponseEntity<List<UserDto>> getListClient() {
        return ResponseEntity.ok(userService.getListClients(Role.CLIENT));
    }

    @GetMapping("/client/actif")
    public ResponseEntity<List<UserDto>> getListClientActif() {
        return ResponseEntity.ok(userService.getListClientWithStatusActif(Role.CLIENT, Boolean.TRUE));
    }

    @GetMapping("/client/inactif")
    public ResponseEntity<List<UserDto>> getListClientInactif() {
        return ResponseEntity.ok(userService.getListClientWithStatusActif(Role.CLIENT, Boolean.FALSE));
    }

    @GetMapping("/client/{id}")
    public ResponseEntity<UserDto> getClient(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userService.getClientById(id));
    }

    @PatchMapping("client/activate/{id}")
    public ResponseEntity<Map<String, String>> activateClient(@PathVariable Long id) {
        return ResponseEntity.ok(userService.activateClient(id));
    }

    @PatchMapping("client/update/{id}")
    public ResponseEntity<Map<String, String>> updateClientData(@PathVariable Long id,  @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.updateClientData(id, request));
    }
    
}
