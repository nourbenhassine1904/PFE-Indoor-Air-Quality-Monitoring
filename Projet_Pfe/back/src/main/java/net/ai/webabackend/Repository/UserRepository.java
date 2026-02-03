package net.ai.webabackend.Repository;

import net.ai.webabackend.modal.Role;
import net.ai.webabackend.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findAllById(Long id);

    List<User> findAllByRole(Role role);

    List<User> findAllByRoleAndActif(Role role, Boolean actif);
}
