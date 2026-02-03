package net.ai.webabackend.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.ai.webabackend.Repository.PackRepository;
import net.ai.webabackend.modal.Pack;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/v1/pack")
@RequiredArgsConstructor
public class PackController {

    @Autowired
    private PackRepository packRepo;

    @GetMapping("")
    public ResponseEntity<List<Pack>> getPacks() {
        return ResponseEntity.ok(packRepo.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Pack>> getPack(@PathVariable("id") Long id) {
        return ResponseEntity.ok(packRepo.findById(id));
    }
    
}
