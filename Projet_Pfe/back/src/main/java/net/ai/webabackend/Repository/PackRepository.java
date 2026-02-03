package net.ai.webabackend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import net.ai.webabackend.modal.Pack;

public interface PackRepository extends JpaRepository<Pack, Integer> {
    Optional<Pack> findById(Long id);
}
